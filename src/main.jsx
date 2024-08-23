import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/login.jsx";
import RegisterPage from "./Pages/register.jsx";
import ErrorPage from "./Pages/404.jsx";
import DashboardPage from "./Pages/dashboard.jsx";
import ProfilePage from "./Pages/profile.jsx";
import KalenderPage from "./Pages/kalender.jsx";
import WorkOrderPage from "./Pages/workorder.jsx";
import WorkLogPage from "./Pages/worklog.jsx";
// import DetailProductPage from "./Pages/DetailProduct.jsx";
import { Provider } from "react-redux";
import store from "../redux/store.js";
// import Navbar from "./components/Layouts/Navbar.jsx";
import DarkModeContextProvider, { DarkMode } from "./context/DarkMode.jsx";
import { TotalPriceProvider } from "./context/TotalPriceContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/kalender",
    element: <KalenderPage />,
  },
  {
    path: "/worklog",
    element: <WorkLogPage />,
  },
  {
    path: "/workorder",
    element: <WorkOrderPage />,
  },
  // {
  //   path: "/product/:id",
  //   element: <DetailProductPage />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Navbar /> */}
      <DarkModeContextProvider>
        <TotalPriceProvider>
          <RouterProvider router={router} />
        </TotalPriceProvider>
      </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>
);
