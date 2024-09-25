import React, { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./Components/Navbar/NavBar";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
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

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      element: isAuthenticated ? <LoginNavBar /> : <NavBar />,
      children: [
        {
          path: "/",
          element: <About />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/benefits",
          element: <Benefits />,
        },
        {
          path: "/contact",
          element: <ContactUs />,
        },

        {
          path: "/dashboard",
          element: isAuthenticated? <DashBoard />: <Navigate to="/"/>,
        },
        {
          path: "/create",
          element: isAuthenticated? <CreateBudget />: <Navigate to="/"/>,
        },
        {
          path: "/reports",
          element: isAuthenticated? <Reports />:<Navigate to="/"/>,
        },
        {
          path: "/charts",
          element: isAuthenticated? <Chart />:<Navigate to="/"/>,
        },
        {
          path: "/settings",
          element: isAuthenticated? <ProfileSettings />:<Navigate to="/"/>,
        },
        {
          path:"/incomeform",
          element: isAuthenticated?  <IncomeForm/> : <Navigate to= "/"/>,
        },
        {
          path:"/savingform",
          element: isAuthenticated ? <SavingForm /> : <Navigate to="/"/>
        },
        {
          path:"/expenseform",
          element: isAuthenticated? <ExpenseForm /> : <Navigate to ="/"/>
        },
        {
          path:"/budgetform",
          element: isAuthenticated ? <BudgetForm/> : <Navigate to="/"/>
        },
        {
          path:"/logout",
          element: <Logout/> 
        }
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
