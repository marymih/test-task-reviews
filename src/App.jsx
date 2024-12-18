import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchReviewsRequest } from './redux/reviewsSlice';
import ReviewsTable from './components/ReviewsTable';

const App = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState({ key: '', direction: '' });

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

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Reviews</h1>
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && (
        <ReviewsTable
          data={sortedReviews}
          onSort={handleSort}
          sortOrder={sortOrder}
        />
      )}
    </div>
  );
};

export default App;
