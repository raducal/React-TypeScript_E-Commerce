import React, { useEffect, useContext } from "react";

import { ProductContext, IState } from "../Context/ProductsContext";

const SingleItem: React.FC<any> = ({ location: { state } }) => {
  const { addToCart } = useContext(ProductContext);
  useEffect(() => {
    console.log(addToCart);
  }, []);

  return (
    <div className="singleItem">
      {/* game image */}
      <div className="singleItemContent">
        <div
          style={{
            backgroundImage: `url(${state.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            height: "400px",
            width: "300px",
            margin: "0 20px",
          }}
        ></div>
        {/* other game info */}
        <div className="singleItemInfo">
          <h3>{state.name}</h3>
          <div className="singleItemInfoSelect">
            <select name="Platform" id="selectplatform">
              <option selected disabled>
                Choose a Platform
              </option>
              <option value="1">PS4</option>
              <option value="2">Xbox</option>
            </select>
          </div>
          <button className="singleItemInfoAddToCartBtn">Add to Cart</button>
          <p>${state.price}</p>
        </div>
      </div>
      <div className="singleItemSimilar">Scroll similar items</div>
    </div>
  );
};

export default SingleItem;
