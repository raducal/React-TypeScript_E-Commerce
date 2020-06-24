import React, { useContext, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { ProductContext } from "../../Context/ProductsContext";
import Modal from "../Modal";
import CartModal from "./Cart/CartModal";

const TopNav: React.FC = () => {
  const { totalCart, items } = useContext(ProductContext);
  const [activeModal, setActiveModal] = useState(false);

  const openModal = () => {
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
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
      {activeModal && returnCartModal(items, closeModal, totalCart)}
    </div>
  );
};

export const returnCartModal = (
  items: any,
  closeModal: () => void,
  total: number
) => {
  let itemsCpy = Object.keys(items);
  if (itemsCpy.length === 0) {
    return (
      <Modal closeModal={closeModal}>
        <div className="cartItem">Cart Is Empty</div>;
      </Modal>
    );
  } else {
    return (
      <Modal closeModal={closeModal}>
        <CartModal />
        <div className="cartTotalPrice">{total}</div>
      </Modal>
    );
  }
};

export default TopNav;
