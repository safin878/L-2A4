import { useState } from "react";
import { useAddBookMutation } from "../features/books/bookApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });
  const [addBook, { isLoading }] = useAddBookMutation();
  const navigate = useNavigate();

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
    try {
      await addBook(formData).unwrap();
      toast.success("Book added successfully! 🎉");
      navigate("/");
    } catch {
      toast.error("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-green-700">
        Add New Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          name="isbn"
          placeholder="ISBN"
          value={formData.isbn}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition resize-none"
          rows={4}
        />
        <input
          type="number"
          name="copies"
          placeholder="Copies"
          value={formData.copies}
          min={0}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-md text-white font-semibold ${
            isLoading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 transition"
          }`}
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
