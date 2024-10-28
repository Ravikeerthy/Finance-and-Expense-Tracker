import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./LoginNavBarStyle.css";

const LoginNavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const closeNavbar = () => {
    setIsCollapsed(true);
  };
  return (
    <div className="row">
      <div className="col-md-2">
        <nav className="navbar" id="navbar-align">
          <div className="container-fluid">
            <button
              className="navbar-toggler d-md-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded={!isCollapsed}
              onClick={toggleNavbar}
              aria-label="Toggle navigation"
              style={{ padding: "0.25rem 0.5rem" }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse d-md-block ${!isCollapsed ? "show" : ""}`}
              id="navbarToggleExternalContent"
            >
              <ul className="nav flex-column" id="navbar-align">
                <li className="nav-item">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeC58wryllyxV22aP5DEAOKjIxm75u5OzFLw&s"
                    alt=""
                    className="img-thumbnail mb-2"
                  />
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/dashboard"
                    onClick={closeNavbar}
                  >
                    Expense Tracker
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/dashboard"
                    onClick={closeNavbar}
                  >
                    DashBoard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/create"
                    onClick={closeNavbar}
                  >
                    Create
                  </NavLink>
                </li>
                 <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/reports"
                    onClick={closeNavbar}
                  >
                    Report
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/settings" onClick={closeNavbar}>
                    Settings
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout" onClick={closeNavbar}>
                    LogOut
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="col-md-10">
        <Outlet />
      </div>
    </div>
  );
};

export default LoginNavBar;
