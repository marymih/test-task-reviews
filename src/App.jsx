import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchReviewsRequest } from './redux/reviewsSlice';
import ReviewsTable from './components/ReviewsTable';

const App = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState({ key: '', direction: '' });

  const [platformFilter, setPlatformFilter] = useState('');
  const [ratingRange, setRatingRange] = useState({ min: 0, max: 5 });

  useEffect(() => {
    dispatch(fetchReviewsRequest());
  }, [dispatch]);

  useEffect(() => {
    setSortedReviews([...reviews]);
  }, [reviews]);

  //sorting function
  const handleSort = (key) => {
    const direction =
      sortOrder.key === key && sortOrder.direction === 'asc' ? 'desc' : 'asc';
    const sorted = [...sortedReviews].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      // sort by number
      if (!isNaN(aValue) && !isNaN(bValue)) {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // convert to Date if key is 'date'
      if (Date.parse(aValue) && Date.parse(bValue)) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // sort by string
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
    setSortedReviews(sorted);
    setSortOrder({ key, direction });
  };

  //filtering function
  const handleFilters = () => {
    const filtered = reviews.filter((review) => {
      const matchesPlatform = platformFilter
        ? review.platform.toLowerCase().includes(platformFilter.toLowerCase())
        : true;

      const matchesRating =
        review.rating >= ratingRange.min && review.rating <= ratingRange.max;

      return matchesPlatform && matchesRating;
    });
    setSortedReviews(filtered);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Reviews</h1>
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="me-3">
              <label htmlFor="platformFilter" className="form-label">
                Platform:
              </label>
              <input
                id="authorFilter"
                type="text"
                className="form-control"
                placeholder="Enter the platform name"
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
              />
            </div>
            <div className="d-flex">
              <div className="me-3">
                <label htmlFor="minRating" className="form-label">
                  Min rating:
                </label>
                <input
                  id="minRating"
                  type="number"
                  className="form-control"
                  value={ratingRange.min}
                  onChange={(e) =>
                    setRatingRange((prev) => ({
                      ...prev,
                      min: Number(e.target.value),
                    }))
                  }
                  min="0"
                  max="5"
                />
              </div>
              <div>
                <label htmlFor="maxRating" className="form-label">
                  Max rating:
                </label>
                <input
                  id="maxRating"
                  type="number"
                  className="form-control"
                  value={ratingRange.max}
                  onChange={(e) =>
                    setRatingRange((prev) => ({
                      ...prev,
                      max: Number(e.target.value),
                    }))
                  }
                  min="0"
                  max="5"
                />
              </div>
            </div>
            <button className="btn btn-primary" onClick={handleFilters}>
              Apply filters
            </button>
          </div>
          <ReviewsTable
            data={sortedReviews}
            onSort={handleSort}
            sortOrder={sortOrder}
          />
        </>
      )}
    </div>
  );
};

export default App;
