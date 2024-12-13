const Table = ({ data }) => (
  <table>
    <thead>
      <tr>
        <th>Platform</th>
        <th>Rating</th>
        <th>Time</th>
        <th>Review</th>
      </tr>
    </thead>
    <tbody>
      {data.map((review) => (
        <tr key={review.id}>
          <td>{review.platform}</td>
          <td>{review.rating}</td>
          <td>{review.date}</td>
          <td>{review.text}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
