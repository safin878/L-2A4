// import { useGetBorrowSummaryQuery } from "../features/borrows/borrowApi";

// type BorrowSummaryItem = {
//   _id: string;
//   title: string;
//   isbn: string;
//   totalQuantity: number;
// };

// const BorrowSummary = () => {
//   const { data: summary, isLoading, error } = useGetBorrowSummaryQuery();

//   if (isLoading) return <p>Loading summary...</p>;
//   if (error) return <p>Error loading summary.</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Borrow Summary</h1>
//       <table className="w-full border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Book Title</th>
//             <th className="p-2 border">ISBN</th>
//             <th className="p-2 border">Total Quantity Borrowed</th>
//           </tr>
//         </thead>
//         <tbody>
//           {summary?.map((item) => (
//             <tr key={item._id} className="hover:bg-gray-50">
//               <td className="p-2 border">{item.title}</td>
//               <td className="p-2 border">{item.isbn}</td>
//               <td className="p-2 border">{item.totalQuantity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BorrowSummary;
