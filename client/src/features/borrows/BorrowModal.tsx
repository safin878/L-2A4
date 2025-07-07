// // src/features/borrows/BorrowModal.tsx
// import React, { useState } from "react";
// import { useBorrowBookMutation } from "./borrowApi";
// import type { IBook } from "../../types/book";

// interface BorrowModalProps {
//   book: IBook;
//   onClose: () => void;
// }

// const BorrowModal: React.FC<BorrowModalProps> = ({ book, onClose }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [dueDate, setDueDate] = useState("");
//   const [borrowBook, { isLoading }] = useBorrowBookMutation();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (quantity > book.copies) {
//       alert("Quantity cannot exceed available copies.");
//       return;
//     }

//     if (!dueDate) {
//       alert("Please select a due date.");
//       return;
//     }

//     await borrowBook({
//       bookId: book._id ?? "",
//       data: { quantity, dueDate },
//     });

//     alert("Book borrowed successfully!");
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
//         <h2 className="text-xl font-bold mb-4">Borrow "{book.title}"</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="number"
//             min={1}
//             max={book.copies}
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value))}
//             placeholder="Quantity"
//             className="w-full border p-2 rounded"
//             required
//           />
//           <input
//             type="date"
//             value={dueDate}
//             onChange={(e) => setDueDate(e.target.value)}
//             className="w-full border p-2 rounded"
//             required
//           />
//           <div className="flex justify-between">
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Borrow
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="text-gray-600 border px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BorrowModal;

import React, { useState } from "react";
import { useBorrowBookMutation } from "./borrowApi";
import type { IBook } from "../../types/book";
import toast from "react-hot-toast";

interface BorrowModalProps {
  book: IBook;
  onClose: () => void;
}

const BorrowModal: React.FC<BorrowModalProps> = ({ book, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity > book.copies) {
      toast.error("Quantity cannot exceed available copies.");
      return;
    }

    if (!dueDate) {
      toast.error("Please select a due date.");
      return;
    }

    try {
      await borrowBook({
        bookId: book._id ?? "",
        data: { quantity, dueDate },
      }).unwrap();

      toast.success("Book borrowed successfully!");
      onClose();
    } catch {
      toast.error("Failed to borrow book. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Borrow "{book.title}"</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            min={1}
            max={book.copies}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 border px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Borrow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BorrowModal;
