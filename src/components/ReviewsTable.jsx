const ReviewsTable = ({ data, onSort, sortOrder }) => {
  return (
    <table className="table table-striped table-hover">
      <thead className="thead-dark">
        <tr>
          <th onClick={() => onSort('platform')} style={{ cursor: 'pointer' }}>
            Platform{' '}
            {sortOrder.key === 'platform' &&
              (sortOrder.direction === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => onSort('rating')} style={{ cursor: 'pointer' }}>
            Rating{' '}
            {sortOrder.key === 'rating' &&
              (sortOrder.direction === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => onSort('date')} style={{ cursor: 'pointer' }}>
            Time{' '}
            {sortOrder.key === 'date' &&
              (sortOrder.direction === 'asc' ? '▲' : '▼')}
          </th>
          <th>Review</th>
        </tr>
      </thead>
      <tbody>
        {data.map((review) => (
          <tr key={review.id}>
            <td>{review.platform}</td>
            <td>{review.rating}</td>
            <td>{new Date(review.date).toLocaleString()}</td>
            <td>{review.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReviewsTable;
