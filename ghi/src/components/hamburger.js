import React from 'react'
import { useEffect, useState } from "react";
import "../styling/hamburger.css"

const Hamburger = () => {
  const handleClick = () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.navigation');
    hamburger.classList.toggle('hamburger--active');
    nav.classList.toggle('navigation--active');
  }

  return (
    <>
      <button className="hamburger" onClick={handleClick}>
        <span className="hamburger__box">
          <span className="hamburger__inner"></span>
        </span>
      </button>
      <div className="navigation">
        <ul className="navigation__list">
          <li className="navigation__item">
            <a className="nav-link" href="/signup">Sign Up</a>
          </li>
          <li className="navigation__item">
            <a className="nav-link" href="/login">Login</a>
          </li>
          <li className="navigation__item">
            <a className="nav-link" href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Hamburger
