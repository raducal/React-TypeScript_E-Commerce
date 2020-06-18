import React from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const TopNav: React.FC = () => {
  return (
    <div className="topNav">
      <span>Lang</span>
      <div className="basketLogin">
        <button className="loginDiv">
          <FaUserCircle />
          <span>Log In</span>
        </button>
        <div className="cartDiv">
          <FaShoppingCart size={20} />
          <span>$0.00</span>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
