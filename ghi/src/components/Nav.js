import {Link, NavLink } from "react-router-dom";
import littlecontroller from "/app/src/images/littlecontroller.png";
import "../styling/nav.css"
import { useToken } from "../Auth";
import NavSearch from "./nav_name_search";
import Hamburger from "./hamburger";


function Nav() {
  return (
  <div className="navbar-container">
    <nav className="navbar navbar-expand-lg navbar-light background-color:#7950f2">
    <a className="navbar-brand" href="#"></a>
    <div className="center-bootstrap collapse navbar-collapse" id="navbarSupportedContent">
      <div className="navbar-container-2">
          <NavLink className="navbar-brand" to="/mainpage">
          <img className="img-fluid width=50% height=50%" src={littlecontroller} alt="controller pic" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="/games">All Games</a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="/mgls">My lists</a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="/account">My Account</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/users">Users List</a>
        </li>
        <li>
          <NavSearch></NavSearch>
        </li>
        </ul>
        </div>
        </div>
        <Hamburger></Hamburger>
      </nav>
  </div>
  )
}
export default Nav;
