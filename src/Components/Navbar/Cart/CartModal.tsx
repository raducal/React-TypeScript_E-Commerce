import React, { useContext } from "react";
import { ProductContext, IState } from "../../../Context/ProductsContext";

const CartModal = () => {
  const { products, items } = useContext(ProductContext);
  return (
    <div className="cartItems">
      {products.map((product: IState, i: number) => {
        if (items[product.id]) {
          let quantity = items[product.id];
          let totalItemPrice = product.price * quantity;
          return (
            <div className="cartItem" key={i}>
              <img src={product.img} alt="img" />
              <p>{product.name}</p>
              <p>{quantity}</p>
              <p>{totalItemPrice.toFixed(2)}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CartModal;
