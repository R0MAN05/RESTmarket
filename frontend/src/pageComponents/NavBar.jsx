import { Link } from "react-router";
import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <h1 className="text-3xl font-bold">
          <Link to={"/"}>Product Store 🛒</Link>
        </h1>
      </div>
    </nav>
  );
};

export default NavBar;
