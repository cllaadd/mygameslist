import {Link, NavLink } from "react-router-dom";
import littlecontroller from "/app/src/images/littlecontroller.png";
import "../styling/nav.css"
import { useToken } from "../Auth";
import NavSearch from "./nav_name_search";
import Hamburger from "./hamburger";


function Nav() {
  return (
  <div className="navbar-container">
    <nav class="navbar navbar-expand-lg navbar-light background-color:#7950f2">
    <a class="navbar-brand" href="#"></a>
    <div className="center-bootstrap" class="collapse navbar-collapse" id="navbarSupportedContent">
      <div className="navbar-container-2">
          <NavLink className="navbar-brand" to="/mainpage">
          <img class="img-fluid width=50% height=50%" src={littlecontroller} alt="controller pic" />
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
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="/games">All Games</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="/mgls">My lists</a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="/account">My Account</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/users">Users List</a>
        </li>
        <li>
          <NavSearch></NavSearch>
        </li>
        </ul>
        </div>

        {/* <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form> */}
        </div>
        <Hamburger></Hamburger>
      </nav>
  </div>
  )
}
export default Nav;
