import React from "react";

interface IQuantityProps {
  addToQty: () => void;
  takeFromQty: () => void;
  qty: number;
}
const Quantity: React.FC<IQuantityProps> = ({ addToQty, takeFromQty, qty }) => {
  return (
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
  );
};

export default Quantity;
