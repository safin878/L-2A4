import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IBorrowSummary {
  bookId: string;
  title: string;
  isbn: string;
  totalQuantity: number;
}

export interface IBorrowRequestData {
  quantity: number;
  dueDate: string;
}

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://a4backend.vercel.app/api/borrows",
  }),
  tagTypes: ["Borrows", "Books"], // Add Books tag here too
  endpoints: (builder) => ({
    // Borrow a book mutation
    borrowBook: builder.mutation<
      unknown, // you can define the expected response type if you want
      { bookId: string; data: IBorrowRequestData }
    >({
      query: ({ bookId, data }) => ({
        url: `/${bookId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrows", "Books"], // Add "Books" here
    }),
    // Get borrow summary query
    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => "/summary",
      providesTags: ["Borrows"],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
