import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./AboutStyle.css";

const About = () => {
  return (
    <div>
      <div className="home-container">
        <header className="hero-section">
          <h1>Welcome to Expense Tracker</h1>
          <p>
            Take control of your finances with our easy-to-use expense
            management system!
          </p>
          <div className="cta-buttons">
            <NavLink to="/register" className="btn-primary-1">
              Get Started
            </NavLink>
          </div>
        </header>

        <section className="features-section">
          <h2>Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <h3>Track Expenses</h3>
              <p>
                Keep a close eye on where your money goes. Log your expenses and
                categorize them easily.
              </p>
             
            </div>
            <div className="feature-item">
              <h3>Set Budgets</h3>
              <p>
                Create and manage budgets for different categories to prevent
                overspending.
              </p>
            </div>
            <div className="feature-item">
              <h3>Generate Reports</h3>
              <p>
                Analyze your spending patterns with visual charts and detailed
                reports.
              </p>
            </div>
            <div className="feature-item">
              <h3>Mobile Friendly</h3>
              <p>
                Access your data anywhere, anytime with our mobile-responsive
                design.
              </p>
            </div>
          
          </div>
        </section>

        <footer className="footer-section">
          <p>&copy; 2024 Expense Tracker. All rights reserved.</p>
          <p>
            Need help? <NavLink to="/contact">Contact us</NavLink>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About;
