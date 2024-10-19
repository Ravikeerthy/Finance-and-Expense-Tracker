import React from "react";
import Testimonial from "./Testimonial";
import "./StyleBenefits.css";
import { useNavigate } from "react-router-dom";

const Benefits = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="benefits-container">
        <h1 className="heading">Benefits of Using Our Expense Tracker</h1>
        <h2 className="heading-2">Take control of your finances and achieve your financial goals.</h2>

        <div className="benefits-list">
          <div className="benefit-item">
            <h3>Easy Expense Management</h3>
            <p>
              Track your daily expenses effortlessly. Categorize your spending
              to see where your money goes.
            </p>
          </div>
          <div className="benefit-item">
            <h3>Budgeting Tools</h3>
            <p>
              Set budgets for different categories and receive alerts when
              you’re nearing your limits.
            </p>
          </div>
          <div className="benefit-item">
            <h3>Financial Insights</h3>
            <p>
              Generate reports and gain insights into your spending habits to
              make informed decisions.
            </p>
          </div>
          <div className="benefit-item">
            <h3>Goal Setting</h3>
            <p>
              Set savings goals for vacations, emergencies, or any purpose, and
              track your progress.
            </p>
          </div>
          <div className="benefit-item">
            <h3>Recurring Transactions</h3>
            <p>
              Easily manage and record recurring expenses, ensuring you never
              miss a payment.
            </p>
          </div>
          <div className="benefit-item">
            <h3>User-Friendly Interface</h3>
            <p>
              Our intuitive design makes tracking finances simple and accessible
              for everyone.
            </p>
          </div>
          <div className="benefit-item">
            <h3>Secure and Private</h3>
            <p>
              Your data is protected with industry-standard security measures,
              ensuring your information remains confidential.
            </p>
          </div>
        </div>

        <div className="testimonials">
          <h2>What Our Users Say</h2>
         <Testimonial/>
        </div>

        <button className="cta-button" onClick={()=>navigate("/register")}>Sign Up Now</button>
      </div>
    </div>
  );
};

export default Benefits;
