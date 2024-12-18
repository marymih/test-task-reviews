const Table = ({ data, onSort, sortOrder }) => {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort('platform')}>
            Platform{' '}
            {sortOrder.key === 'platform' &&
              (sortOrder.direction === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => onSort('rating')}>
            Rating{' '}
            {sortOrder.key === 'rating' &&
              (sortOrder.direction === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => onSort('date')}>
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

export default Table;
