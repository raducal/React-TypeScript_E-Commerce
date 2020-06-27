import React, { useContext } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { ProductContext } from "../../Context/ProductsContext";
import { Link } from "react-router-dom";

const TopNav: React.FC = () => {
  const { totalCart } = useContext(ProductContext);

  return (
    <div className="topNav">
      <div></div>
      <div className="basketLogin">
        <button className="loginDiv">
          <FaUserCircle />
          <span>Log In</span>
        </button>
        <Link to={`/cart`} className="cartDiv">
          <FaShoppingCart size={20} />
          <span>${totalCart === 0 ? "0.00" : `${totalCart}`}</span>
        </Link>
      </div>
    </div>
  );
};

export default TopNav;
