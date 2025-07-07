// import { useState } from "react";
// import { useGetBooksQuery, useDeleteBookMutation } from "./bookApi";
// import EditBookModal from "./EditBookModal";
// import BorrowModal from "../borrows/BorrowModal";
// import type { IBook } from "../../types/book";
// import toast from "react-hot-toast";

// const BookList = () => {
//   const { data: books, isLoading } = useGetBooksQuery();
//   const [deleteBook] = useDeleteBookMutation();
//   const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
//   const [borrowBookData, setBorrowBookData] = useState<IBook | null>(null);

//   const handleDelete = async (id: string, title: string) => {
//     try {
//       await deleteBook(id).unwrap();
//       toast.success(`"${title}" deleted successfully!`);
//     } catch {
//       toast.error(`Failed to delete "${title}". Try again.`);
//     }
//   };

//   if (isLoading)
//     return (
//       <p className="text-center text-gray-500 mt-10 text-lg font-semibold">
//         Loading...
//       </p>
//     );

//   return (
//     <>
//       <div className="p-6 max-w-6xl mx-auto">
//         <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
//           All Books
//         </h1>

//         <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-blue-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">
//                   Title
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">
//                   Author
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">
//                   Genre
//                 </th>
//                 <th className="px-6 py-3 text-center text-sm font-semibold text-blue-800">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="bg-white divide-y divide-gray-200">
//               {books?.map((book) => (
//                 <tr key={book._id} className="hover:bg-blue-50 transition">
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium text-sm max-w-xs truncate">
//                     {book.title}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm max-w-xs truncate">
//                     {book.author}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm max-w-xs truncate">
//                     {book.genre}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-center text-sm flex justify-center gap-4">
//                     <button
//                       onClick={() =>
//                         book._id && handleDelete(book._id, book.title)
//                       }
//                       className="text-red-600 hover:text-red-800 font-semibold transition"
//                       title="Delete Book"
//                       aria-label={`Delete ${book.title}`}
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => setSelectedBook(book)}
//                       className="text-blue-600 hover:text-blue-800 font-semibold transition"
//                       title="Update Book"
//                       aria-label={`Update ${book.title}`}
//                     >
//                       Update
//                     </button>
//                     <button
//                       onClick={() => setBorrowBookData(book)}
//                       className="text-green-600 hover:text-green-800 font-semibold transition"
//                       title="Borrow Book"
//                       aria-label={`Borrow ${book.title}`}
//                     >
//                       Borrow
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//               {!books?.length && (
//                 <tr>
//                   <td
//                     colSpan={4}
//                     className="text-center text-gray-500 py-8 font-medium"
//                   >
//                     No books found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {selectedBook && (
//         <EditBookModal
//           book={selectedBook}
//           onClose={() => setSelectedBook(null)}
//         />
//       )}

//       {borrowBookData && (
//         <BorrowModal
//           book={borrowBookData}
//           onClose={() => setBorrowBookData(null)}
//         />
//       )}
//     </>
//   );
// };

// export default BookList;

import { useState } from "react";
import { useGetBooksQuery, useDeleteBookMutation } from "./bookApi";
import EditBookModal from "./EditBookModal";
import BorrowModal from "../borrows/BorrowModal";
import type { IBook } from "../../types/book";
import toast from "react-hot-toast";

const BookList = () => {
  const { data: books, isLoading } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [borrowBookData, setBorrowBookData] = useState<IBook | null>(null);

  const handleDelete = async (id: string, title: string) => {
    try {
      await deleteBook(id).unwrap();
      toast.success(`"${title}" deleted successfully!`);
    } catch {
      toast.error(`Failed to delete "${title}". Try again.`);
    }
  };

  if (isLoading)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg font-semibold">
        Loading...
      </p>
    );

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">
          All Books
        </h1>

        <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">
                  Genre
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-blue-800">
                  ISBN
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-blue-800">
                  Copies
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-blue-800">
                  Availability
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-blue-800">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {books?.map((book) => (
                <tr key={book._id} className="hover:bg-blue-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium text-sm max-w-xs truncate">
                    {book.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm max-w-xs truncate">
                    {book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm max-w-xs truncate">
                    {book.genre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 text-sm max-w-xs truncate">
                    {book.isbn}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-gray-700 text-sm font-semibold">
                    {book.copies}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                    {book.available ? (
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        Available
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                        Unavailable
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm flex justify-center gap-4">
                    <button
                      onClick={() =>
                        book._id && handleDelete(book._id, book.title)
                      }
                      className="text-red-600 hover:text-red-800 font-semibold transition"
                      title="Delete Book"
                      aria-label={`Delete ${book.title}`}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="text-blue-600 hover:text-blue-800 font-semibold transition"
                      title="Update Book"
                      aria-label={`Update ${book.title}`}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => setBorrowBookData(book)}
                      className="text-green-600 hover:text-green-800 font-semibold transition"
                      title="Borrow Book"
                      aria-label={`Borrow ${book.title}`}
                    >
                      Borrow
                    </button>
                  </td>
                </tr>
              ))}

              {!books?.length && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-gray-500 py-8 font-medium"
                  >
                    No books found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBook && (
        <EditBookModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}

      {borrowBookData && (
        <BorrowModal
          book={borrowBookData}
          onClose={() => setBorrowBookData(null)}
        />
      )}
    </>
  );
};

export default BookList;
