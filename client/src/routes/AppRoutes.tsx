// import { Routes, Route } from "react-router-dom";
// import BookList from "../features/books/BookList";
// import Layout from "../components/Layout";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route
//         path="/"
//         element={
//           <Layout>
//             <BookList />
//           </Layout>
//         }
//       />
//       {/* <Route path="/create-book" element={<Layout><AddBook /></Layout>} /> */}
//       {/* Add other routes similarly */}
//     </Routes>
//   );
// };

// export default AppRoutes;

import { Routes, Route } from "react-router-dom";

// Pages
import BookList from "../features/books/BookList";
import AddBook from "../pages/AddBook";

// import BorrowForm from "../features/borrows/BorrowForm";
import BorrowSummary from "../features/borrows/BorrowSummary";
// import NotFound from "../pages/NotFound";

// Shared Layout
import Layout from "../components/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <BookList />
          </Layout>
        }
      />
      <Route
        path="/create-book"
        element={
          <Layout>
            <AddBook />
          </Layout>
        }
      />

      {/* <Route
        path="/borrow/:bookId"
        element={
          <Layout>
            <BorrowForm />
          </Layout>
        }
      /> */}
      <Route
        path="/borrow-summary"
        element={
          <Layout>
            <BorrowSummary />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
