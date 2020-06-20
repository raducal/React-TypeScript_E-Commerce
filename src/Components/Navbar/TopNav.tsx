import React, { useContext, useEffect } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { ProductContext } from "../../Context/ProductsContext";

const TopNav: React.FC = () => {
  const { totalCart } = useContext(ProductContext);

  useEffect(() => {
    console.log(totalCart);
  });
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
          <span>${totalCart === 0 ? "0.00" : `${totalCart}`}</span>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
