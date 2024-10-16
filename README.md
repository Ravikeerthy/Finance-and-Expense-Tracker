# Expense Tracker Frontend 🎯

This is the frontend application for the Expense Tracker, built to help users manage their income, expenses, budgets, and savings. The application interacts with a backend API to provide a seamless user experience.

## 🚀 Features
- **Financial Overview 📊**: View a comprehensive summary of your income, expenses, budgets, and savings.
- **Income Management 💵**: Add, edit, and delete income sources, and track their details.
- **Expense Management 🏷️**: Log and categorize expenses, view their history, and manage overall spending.
- **Budget Tracking 📈**: Set budgets for different categories and monitor your spending against these budgets.
- **Savings Goals 🏦**: Define savings goals and track your progress over time.
- **User Authentication 🔐**: Secure login and registration with JWT-based authentication.
- **Responsive Design 📱**: Optimized for all devices, ensuring a great experience on desktops and mobiles.

## 🛠️ Tech Stack
- **React ⚛️**: The entire frontend is built with React, leveraging hooks for state management.
- **Axios 📡**: For making HTTP requests to the backend API.
- **React Router 🛣️**: To handle navigation and routing between different pages.
- **CSS Modules 🎨**: For modular and scoped styling of components.
- **Nodemailer 📧**: For sending email notifications for important actions such as registration, updates, and deletions.
- **Netlify 🌐**: Deployed on Netlify for a fast and reliable hosting experience.

## 🔧 API Endpoints
This project interacts with a backend server deployed on Render. Below are the major key endpoints used:

### Authentication:
- `POST /api/auth/login`: To log in and receive a JWT token.
- `POST /api/auth/register`: To register a new user.

### Income Management:
- `GET /income/getIncomeByUserId/:userId`: Fetch income data for the logged-in user.
- `POST /income/newincome`: Add a new income record.
- `DELETE /income/delete/:id`: Delete an income record by ID.

### Expense Management:
- `GET /expense/expenseuserId/:userId`: Fetch expenses for the logged-in user.
- `POST /expense/newexpense`: Add a new expense record.
- `DELETE /expense/delete/:id`: Delete an expense record by ID.

### Budget Management:
- `GET /budget/getBudgetByUserId/:userId`: Fetch budgets for the logged-in user.
- `POST /budget/newbudget`: Add a new budget record.
- `DELETE /budget/delete/:id`: Delete a budget record by ID.

### Savings Management:
- `GET /savings/getbyid/:userId`: Fetch savings goals for the logged-in user.
- `POST /savings/newsaving`: Add a new savings goal.
- `DELETE /savings/delete/:id`: Delete a savings goal by ID.

You can visit the deployed website [here](https://finance-and-expense-tracker.netlify.app/).
