import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProductContext, IState } from "../../Context/ProductsContext";
import products from "../../data";

interface IProps {
  consoleArr: IState[];
  type: string;
  genre?: string;
}

const Products: React.FC<IProps> = ({ consoleArr, type, genre }) => {
  return (
    <div className="products">
      {consoleArr.map((product) => {
        return (
          <div key={product.id} className="product">
            <Link
              to={{
                pathname: `/products/${type}/${product.name}`,
                state: product,
              }}
            >
              <img className="productImg" src={product.img} alt="img" />
            </Link>
            <div className="productName">{product.name}</div>
            <div className="consoles">
              <img
                className="consoleLogo"
                src={product.logo}
                alt="Console Logo"
              />
            </div>
            <div className="productPrice">${product.price}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
