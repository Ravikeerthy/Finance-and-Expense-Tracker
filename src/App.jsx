import React, { useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/Navbar/NavBar";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Register from "./Components/Register/Register";
import Benefits from "./Components/Benefits/Benefits";
import ContactUs from "./Components/contact/ContactUs";
import About from "./Components/About/About";
import DashBoard from "./Components/DashBoard/DashBoard";
import Chart from "./Components/chart/Chart";
import LoginNavBar from "./Components/LoginNavBar/LoginNavBar";
import CreateBudget from "./Components/CreateBudget/CreateBudget";
import Reports from "./Components/Reports/Reports";
import ProfileSettings from "./Components/ProfileSettings/ProfileSettings";
import { AuthContext } from "./Components/AuthContext/AuthContext";
import IncomeForm from "./Components/CreateBudget/IncomeForm";
import SavingForm from "./Components/CreateBudget/SavingForm";
import ExpenseForm from "./Components/CreateBudget/ExpenseForm";
import BudgetForm from "./Components/CreateBudget/BudgetForm";
import Logout from "./Components/LogOut/Logout";
import NotificationComp from "./Components/Notification/NotificationComp";
import NewPasswordComp from "./Components/Register/NewPasswordComp";
import PasswordResetComp from "./Components/Register/PasswordResetComp";
import EditValues from "./Components/CreateBudget/EditValues";
import { NotificationProvider } from "./Components/AuthContext/NotificationContext";
import { io } from "socket.io-client";
import ThemeProvider from "./Components/AuthContext/ThemeMode";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  const { userId } = useContext(AuthContext);
  useEffect(() => {
    const socket = io("https://back-end-d6p7.onrender.com", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to the server:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const router = createBrowserRouter([
    {
      element: (
        <>
          <NavBar />,
        </>
      ),
      children: [
        { path: "/", element: <About /> },
        { path: "/register", element: <Register /> },
        { path: "/benefits", element: <Benefits /> },
        { path: "/contact", element: <ContactUs /> },
        { path: "/reset-password", element: <PasswordResetComp /> },
      ],
    },
    {
      element: (
        <>
          <LoginNavBar />,{/* <NotificationComp /> */}
        </>
      ),
      children: [
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/create",
          element: (
            <ProtectedRoute>
              <CreateBudget />
            </ProtectedRoute>
          ),
        },
        {
          path: "/reports",
          element: (
            <ProtectedRoute>
              <Reports />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/charts",
          element: (
            <ProtectedRoute>
              {" "}
              <Chart />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/settings",
          element: (
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          ),
        },
        {
          path: "/incomeform",
          element: (
            <ProtectedRoute>
              {" "}
              <IncomeForm />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/savingform",
          element: (
            <ProtectedRoute>
              <SavingForm />
            </ProtectedRoute>
          ),
        },
        {
          path: "/expenseform",
          element: (
            <ProtectedRoute>
              <ExpenseForm />
            </ProtectedRoute>
          ),
        },
        {
          path: "/budgetform",
          element: (
            <ProtectedRoute>
              <BudgetForm />
            </ProtectedRoute>
          ),
        },
        { path: "/edit_values/:id", element: <EditValues /> },

        { path: "/notifications", element: <NotificationComp /> },
        { path: "/logout", element: <Logout /> },

        { path: "/reset/:id/:token", element: <NewPasswordComp /> },
      ],
    },

    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
    <NotificationProvider>
      <ThemeProvider>
      <div>
        <RouterProvider router={router} />
      </div>
      </ThemeProvider>
    </NotificationProvider>
  );
};

export default App;
