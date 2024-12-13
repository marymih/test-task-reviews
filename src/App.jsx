import { useState, useEffect } from 'react';
import data from './data.json';
import Table from './components/Table';

const App = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(data);
  }, []);

  return (
    <div>
      <h1>Reviews</h1>
      <Table data={reviews} />
    </div>
  );
};

export default App;
