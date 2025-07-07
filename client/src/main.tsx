// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import AppRoutes from "./routes/AppRoutes";
// import { Provider } from "react-redux";
// import { store } from "./app/store";
// import { BrowserRouter } from "react-router-dom";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <AppRoutes />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <>
          <AppRoutes />
          <Toaster position="top-right" reverseOrder={false} />
        </>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
