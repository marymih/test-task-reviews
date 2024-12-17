import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchReviewsRequest } from './redux/reviewsSlice';
import Table from './components/Table';

const App = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchReviewsRequest());
  }, [dispatch]);

  return (
    <div>
      <h1>Reviews</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Table data={reviews} />
    </div>
  );
};

export default App;
