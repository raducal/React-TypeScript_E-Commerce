import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const BottomNav: React.FC = () => {
  return (
    <nav className="bottomNav activeUnderline">
      <h3>
        <Link to="/">GamerLife</Link>
      </h3>
      <ul className="nav-links">
        <li>
          <Link to="/products/ps4">PS4</Link>
        </li>
        <li>
          <Link to="/products/switch">Switch</Link>
        </li>
        <li>
          <Link to="/products/xbox">Xbox One</Link>
        </li>
        <li>
          <Link to="/products/bundles">Bundles</Link>
        </li>
      </ul>
      <div className="searchDiv">
        <input className="searchBar" type="text" placeholder="Search" />
        <FaSearch />
      </div>
    </nav>
  );
};

export default BottomNav;
