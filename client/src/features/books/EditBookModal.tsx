import { useState, useEffect } from "react";
import { useEditBookMutation } from "./bookApi";
import type { IBook } from "../../types/book";
import toast from "react-hot-toast"; // <-- import this

type EditBookModalProps = {
  book: IBook;
  onClose: () => void;
};

const EditBookModal = ({ book, onClose }: EditBookModalProps) => {
  const [editBook, { isLoading }] = useEditBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        description: book.description ?? "",
        copies: book.copies,
        available: book.available ?? true,
      });
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book._id) {
      return;
    }
    try {
      await editBook({ id: book._id, data: formData }).unwrap();
      toast.success("Book updated successfully! 🎉"); // <-- success toast
      onClose();
    } catch {
      toast.error("Failed to update book. Please try again."); // <-- error toast
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* input fields */}
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="isbn"
            placeholder="ISBN"
            value={formData.isbn}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
