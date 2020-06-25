import React, { useContext, useState } from "react";
import { ProductContext } from "../../Context/ProductsContext";
import CartModal from "../Navbar/Cart/CartModal";
import Modal from "../Modal";

const Cart = () => {
  const { totalCart, items, clearItems } = useContext(ProductContext);
  let itemsCpy = Object.keys(items);

  const [activeModal, setActiveModal] = useState<boolean>(false);

  const showCheckoutModal = () => {
    return (
      <Modal closeModal={closeModalAndClear}>
        <h3>Congrats, purchase complete</h3>
        <p>Your items should be with you shortly</p>
      </Modal>
    );
  };

  const closeModalAndClear = () => {
    clearItems();
    setActiveModal(false);
  };

  return (
    <div className="cart">
      {itemsCpy.length === 0 ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          <CartModal />
          <div className="cartTotalPrice">
            <span>Total:</span>
            <div>${totalCart}</div>
          </div>
          <div className="checkoutBtn">
            <button onClick={() => setActiveModal(true)}>Checkout</button>
          </div>
          {activeModal && showCheckoutModal()}
        </>
      )}
    </div>
  );
};

export default Cart;
