// import { NavLink } from "react-router-dom";

// const Navbar = () => (
//   <nav className="bg-blue-600 text-white p-4 flex space-x-4">
//     <NavLink to="/" className={({ isActive }) => (isActive ? "underline" : "")}>
//       All Books
//     </NavLink>
//     <NavLink
//       to="/create-book"
//       className={({ isActive }) => (isActive ? "underline" : "")}
//     >
//       Add Book
//     </NavLink>
//     <NavLink
//       to="/borrow-summary"
//       className={({ isActive }) => (isActive ? "underline" : "")}
//     >
//       Borrow Summary
//     </NavLink>
//   </nav>
// );

// export default Navbar;

import { NavLink } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white p-4 flex space-x-8 shadow-lg sticky top-0 z-50">
    {[
      { to: "/", label: "All Books" },
      { to: "/create-book", label: "Add Book" },
      { to: "/borrow-summary", label: "Borrow Summary" },
    ].map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          `relative px-3 py-2 font-semibold rounded-md transition-all duration-300
          ${
            isActive
              ? "bg-white text-blue-700 shadow-lg"
              : "hover:bg-blue-500/70"
          }`
        }
      >
        {({ isActive }) => (
          <>
            {label}
            {/* Active underline animation */}
            <span
              className={`absolute bottom-0 left-0 h-1 bg-blue-700 rounded-full transition-all duration-300 ${
                isActive ? "w-full" : "w-0"
              }`}
            />
          </>
        )}
      </NavLink>
    ))}
  </nav>
);

export default Navbar;
