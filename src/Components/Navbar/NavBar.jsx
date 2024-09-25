import React from "react";
import "./NavBarStyle.css";
import { NavLink, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className="main-container">
        <div className="row">
          <div className="col-md-2">
            <ul className="nav flex-column">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeC58wryllyxV22aP5DEAOKjIxm75u5OzFLw&s"
                    alt=""
                    className="img-thumbnail mb-2"
                  />
                  Expense Tracker
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/benefits">
                  Benefits
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact us
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-md-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
