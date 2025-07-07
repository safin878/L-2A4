import { useGetBorrowSummaryQuery } from "../borrows/borrowApi";

const BorrowSummary = () => {
  const { data, isLoading, error } = useGetBorrowSummaryQuery();

  if (isLoading) return <p className="text-center">Loading summary...</p>;
  if (error)
    return <p className="text-red-500 text-center">Error loading summary.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📚 Borrow Summary</h2>
      <div className="overflow-x-auto">
        <table className="w-full border rounded shadow">
          <thead className="bg-blue-100 text-left">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">ISBN</th>
              <th className="p-3 border text-center">Total Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {data?.length ? (
              data.map((item) => (
                <tr key={item.bookId} className="hover:bg-blue-50">
                  <td className="p-3 border">{item.title}</td>
                  <td className="p-3 border">{item.isbn}</td>
                  <td className="p-3 border text-center">
                    {item.totalQuantity}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-6 text-gray-500">
                  No borrow data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowSummary;
