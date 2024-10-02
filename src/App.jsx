import React, { useContext } from "react";
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

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/" />;
};

const App = () => {
  const router = createBrowserRouter([
    
    {
      element: <NavBar />, 
      children: [
        { path: "/", element: <About /> },
        { path: "/register", element: <Register /> },
        { path: "/benefits", element: <Benefits /> },
        { path: "/contact", element: <ContactUs /> },
      ],
    },
    {
      element: <LoginNavBar />, 
      children: [
        {
          path: "/dashboard",
          element: <ProtectedRoute element={<DashBoard />} />,
        },
        {
          path: "/create",
          element: <ProtectedRoute element={<CreateBudget />} />,
        },
        { path: "/reports", element: <ProtectedRoute element={<Reports />} /> },
        { path: "/charts", element: <ProtectedRoute element={<Chart />} /> },
        {
          path: "/settings",
          element: <ProtectedRoute element={<ProfileSettings />} />,
        },
        {
          path: "/incomeform",
          element: <ProtectedRoute element={<IncomeForm />} />,
        },
        {
          path: "/savingform",
          element: <ProtectedRoute element={<SavingForm />} />,
        },
        {
          path: "/expenseform",
          element: <ProtectedRoute element={<ExpenseForm />} />,
        },
        {
          path: "/budgetform",
          element: <ProtectedRoute element={<BudgetForm />} />,
        },
        { path: "/logout", element: <Logout /> },
      ],
    },

    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
