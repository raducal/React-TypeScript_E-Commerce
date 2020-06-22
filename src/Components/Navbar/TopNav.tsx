import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { ProductContext, IState } from "../../Context/ProductsContext";
import Modal from "../Modal";
import CartModal from "./Cart/CartModal";

const TopNav: React.FC = () => {
  const { totalCart, products, items } = useContext(ProductContext);
  const [activeModal, setActiveModal] = useState(false);
  const [total, setTotal] = useState<number>(0);

  const openModal = () => {
    getTotal();
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
  };

  const getTotal = () => {
    let tempTotal = 0;

    for (let product of products) {
      if (items[product.id]) {
        tempTotal += product.price * items[product.id];
      }
    }

    setTotal(tempTotal);
  };

  const returnCartModal = () => {
    let itemsCpy = Object.keys(items);
    if (itemsCpy.length === 0) {
      return <div className="cartItem">Cart Is Empty</div>;
    } else {
      return (
        <Modal closeModal={closeModal}>
          <CartModal />
          <div className="cartTotalPrice">{total.toFixed(2)}</div>
        </Modal>
      );
    }
  };

  return (
    <div className="topNav">
      <span>Lang</span>
      <div className="basketLogin">
        <button className="loginDiv">
          <FaUserCircle />
          <span>Log In</span>
        </button>
        <button className="cartDiv" onClick={openModal}>
          <FaShoppingCart size={20} />
          <span>${totalCart === 0 ? "0.00" : `${totalCart}`}</span>
        </button>
      </div>
      {activeModal && returnCartModal()}
    </div>
  );
};

export default TopNav;
