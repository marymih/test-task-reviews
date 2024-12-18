const ReviewsTable = ({ data, onSort, sortOrder }) => {
  const getSortSymbol = (key) => {
    if (sortOrder.key === key) {
      return sortOrder.direction === 'asc' ? '▲' : '▼';
    }
    return '⇅';
  };

  return (
    <table className="table table-striped table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Platform</th>
          <th onClick={() => onSort('rating')} style={{ cursor: 'pointer' }}>
            Rating {getSortSymbol('rating')}
          </th>
          <th onClick={() => onSort('date')} style={{ cursor: 'pointer' }}>
            Time {getSortSymbol('date')}
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
