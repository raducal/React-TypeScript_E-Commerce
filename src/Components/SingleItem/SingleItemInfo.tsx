import React, { useContext, useState } from "react";
import CustomSelect from "./CustomSelect";
import { IState, ProductContext } from "../../Context/ProductsContext";
import Modal from "../Modal";
import { returnCartModal } from "../Navbar/TopNav";

export interface IProps {
  state: IState;
}

const SingleItemInfo: React.FC<IProps> = ({ state }) => {
  const { addToCart, items, totalCart } = useContext(ProductContext);
  const [qty, setQty] = useState(1);
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [changeModalContent, setChangeModalContent] = useState<boolean>(false);

  const addToQty = () => {
    setQty(qty + 1);
  };

  const takeFromQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const addToCartAndReset = (state: IState, qty: number) => {
    addToCart(state, qty);
    setActiveModal(true);
  };

  const closeModal = () => {
    setActiveModal(false);
    setChangeModalContent(false);
    setQty(1);
  };

  const openCart = () => {
    setChangeModalContent(true);
  };

  const addToCartModalContent = (item: IState) => {
    return (
      <div className="addToCartModalContent">
        <div className="addToCartModalContentItem">
          <h3>Item added to cart</h3>
          <div className="cartItem">
            <img src={item.img} alt="img" />
            <p>{item.name}</p>
            <p>{qty}</p>
            <p>{(item.price * qty).toFixed(2)}</p>
          </div>
        </div>
        <div className="addToCartModalContentButtons">
          <button onClick={closeModal}>Continue Shopping</button>
          <button onClick={openCart}>Go To Cart</button>
        </div>
      </div>
    );
  };

  return (
    <div className="singleItemInfo">
      <h3>{state.name}</h3>
      {/* <CustomSelect /> */}
      <div className="singleItemQty">
        <label>Qty: </label>
        <div>
          <button className="qtyBtn" onClick={takeFromQty}>
            -
          </button>
          <p>{qty}</p>
          <button className="qtyBtn" onClick={addToQty}>
            +
          </button>
        </div>
      </div>
      <p>${state.price}</p>
      <button
        className="singleItemInfoAddToCartBtn"
        onClick={() => addToCartAndReset(state, qty)}
      >
        Add to Cart
      </button>
      {activeModal && (
        <Modal closeModal={closeModal}>
          {changeModalContent
            ? returnCartModal(items, closeModal, totalCart)
            : addToCartModalContent(state)}
        </Modal>
      )}
    </div>
  );
};

export default SingleItemInfo;
