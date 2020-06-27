import React, { useContext, useState } from "react";
import {
  ProductContext,
  IState,
  IBundle,
} from "../../../Context/ProductsContext";
import { FaCheck } from "react-icons/fa";

const CartModal = () => {
  const {
    products,
    items,
    removeItemFromCart,
    bundles,
    updateItemQuantity,
  } = useContext(ProductContext);

  const [showBtn, setShowBtn] = useState<number>(-1);
  const [qty, setQty] = useState<number>(-1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newQty: number = parseInt(event.target.value);
    if (newQty > 0) {
      setQty(newQty);
    }
  };

  const updateQty = (product: IState | IBundle, oldQty: number) => {
    if (qty !== oldQty) {
      updateItemQuantity(product, qty);
    }
    setQty(-1);
    setShowBtn(-1);
  };

  const handleClick = (i: number) => {
    setShowBtn(i);
  };

  let allArr = [...products, ...bundles];
  return (
    <>
      {allArr.map((product: IState, i: number) => {
        if (items[product.id]) {
          let quantity = items[product.id];
          let totalItemPrice = product.price * quantity;
          return (
            <div className="cartItem" key={i}>
              <div className="cartItemImg">
                <img className="cartItemImgCart" src={product.img} alt="img" />
              </div>
              <p>{product.name}</p>
              <div className="qtyInputDiv">
                <input
                  className="qtyInput"
                  value={qty === -1 ? quantity : showBtn === i ? qty : quantity}
                  type="number"
                  onChange={(e) => handleChange(e)}
                  onClick={() => handleClick(i)}
                />
                <button
                  onClick={() => updateQty(product, quantity)}
                  style={{ display: showBtn === i ? "block" : "none" }}
                >
                  <FaCheck />
                </button>
              </div>
              <p>${totalItemPrice.toFixed(2)}</p>
              <button onClick={() => removeItemFromCart(product)}>
                Remove Item
              </button>
            </div>
          );
        }
      })}
    </>
  );
};

export default CartModal;
