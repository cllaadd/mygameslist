import React from "react";

const Header = ({ handleSearch }) => {
  return (
    <header className="header">
      <div className="header__title">Search Users</div>
      <div className="header__search">
        <input
          type="search"
          placeholder="Search users by username"
          onChange={handleSearch}
        />
      </div>
    </header>
  );
};

export default Header;
