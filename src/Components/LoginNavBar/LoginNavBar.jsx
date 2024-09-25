import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const LoginNavBar = () => {
  return (
   
      <div>
      <div className="main-container">
        <div className="row">
          <div className="col-md-2">
            <ul className="nav flex-column">
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
                <NavLink className="nav-link active" aria-current="page" to="/dashboard">
                  DashBoard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/create">
                  Create
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/reports">
                  Reports
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/charts">
                  Charts
                </NavLink>
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

          <div className="col-md-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
   
  )
}

export default LoginNavBar
