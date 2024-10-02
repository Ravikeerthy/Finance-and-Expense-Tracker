import React from "react";
// import "./NavBarStyle.css";
import { NavLink, Outlet } from "react-router-dom";
import "../LoginNavBar/LoginNavBarStyle.css";

const NavBar = () => {
  return (
    <div className="row">
      <div className="col-md-2">
        <nav className="navbar navbar" id="navbar-align">
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
              <div className="p-4">
                {/* <h5 className="text-body-emphasis h4">Collapsed content</h5> */}
               
                <ul className="nav flex-column" id="navbar-align">
                  <li className="nav-item">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeC58wryllyxV22aP5DEAOKjIxm75u5OzFLw&s"
                    alt=""
                    className="img-thumbnail mb-2"
                  />
                    <NavLink className="nav-link" to="/">
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
                      Contact Us
                    </NavLink>
                  </li>
                </ul>
              </div>
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

export default NavBar;
