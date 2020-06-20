import React, { useContext, useState } from "react";
import CustomSelect from "./CustomSelect";
import { IState, ProductContext } from "../../Context/ProductsContext";

export interface IProps {
  state: IState;
}

const SingleItemInfo: React.FC<IProps> = ({ state }) => {
  const { addToCart } = useContext(ProductContext);
  const [qty, setQty] = useState(1);

  const addToQty = () => {
    setQty(qty + 1);
  };

  const takeFromQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  return (
    <div className="singleItemInfo">
      <h3>{state.name}</h3>
      <CustomSelect />
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
        onClick={() => addToCart(state, qty)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default SingleItemInfo;
