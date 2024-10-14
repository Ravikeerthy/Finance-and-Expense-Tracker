import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./LoginNavBarStyle.css";

const LoginNavBar = () => {
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
              aria-expanded="false"
              aria-label="Toggle navigation"
              style={{ padding: "0.25rem 0.5rem" }}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse d-md-block"
              id="navbarToggleExternalContent"
            >
              <ul className="nav flex-column" id="navbar-align">
                <li className="nav-item">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeC58wryllyxV22aP5DEAOKjIxm75u5OzFLw&s"
                    alt=""
                    className="img-thumbnail mb-2"
                  />
                  <NavLink className="nav-link" aria-current="page" to="/">
                    Expense Tracker
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/dashboard"
                  >
                    DashBoard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/create"
                  >
                    Create
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/notifications" className="nav-link">Notifications</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/settings">
                    Settings
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
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
