import React, { useContext, useState } from "react";
import { IState, ProductContext } from "../../Context/ProductsContext";
import Modal from "../Modal";
import { Link } from "react-router-dom";
import Quantity from "../Body/Quantity";

export interface IProps {
  state: IState;
}

const SingleItemInfo: React.FC<IProps> = ({ state }) => {
  const { addToCart } = useContext(ProductContext);
  const [qty, setQty] = useState(1);
  const [activeModal, setActiveModal] = useState<boolean>(false);

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
    setQty(1);
  };

  const addToCartModalContent = (item: IState) => {
    return (
      <div className="addToCartModalContent">
        <div className="addToCartModalContentItem">
          <h3>Item added to cart</h3>
          <div className="cartItem">
            <div className="cartItemImg">
              <img className="cartItemImgModal" src={item.img} alt="img" />
            </div>
            <p>{item.name}</p>
            <p>{qty}</p>
            <p>{(item.price * qty).toFixed(2)}</p>
          </div>
        </div>
        <div className="addToCartModalContentButtons">
          <button className="addToCartModalContentBtn" onClick={closeModal}>
            Continue Shopping
          </button>
          <Link className="addToCartModalContentBtn" to="/cart">
            Go To Cart
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="singleItemInfo">
      <h3>{state.name}</h3>
      {/* <CustomSelect /> */}
      <Quantity addToQty={addToQty} takeFromQty={takeFromQty} qty={qty} />
      <p>${state.price}</p>
      <button
        className="singleItemInfoAddToCartBtn"
        onClick={() => addToCartAndReset(state, qty)}
      >
        Add to Cart
      </button>
      {activeModal && (
        <Modal closeModal={closeModal}>{addToCartModalContent(state)}</Modal>
      )}
    </div>
  );
};

export default SingleItemInfo;
