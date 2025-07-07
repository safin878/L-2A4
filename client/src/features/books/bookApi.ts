import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from "../../types/book";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/books" }),
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => "/",
      providesTags: ["Books"],
    }),
    getBook: builder.query<IBook, string>({
      query: (id) => `/${id}`,
    }),
    addBook: builder.mutation<IBook, Partial<IBook>>({
      query: (book) => ({
        url: "/",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Books"],
    }),
    editBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useAddBookMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = bookApi;
