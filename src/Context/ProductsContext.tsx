import React, { createContext, useReducer, useEffect } from "react";
import allProducts from "../data";
import products from "../data";
import { act } from "react-dom/test-utils";
import { Link, Redirect, useHistory } from "react-router-dom";

export interface IState {
  id: number;
  name: string;
  price: number;
  genre: string;
  img: string;
  logo: string;
  consoles: string;
  inCart: boolean;
}

interface context {
  products: IState[];
  totalCart: number;
  featured: IState[];
}

const initialState = {
  products: [...products],
  totalCart: 0,
  featured: [],
};

interface IActions {
  type: string;
  payload: any;
}

export const ProductContext = createContext<context | any>(initialState);

const reducer: React.Reducer<any, any> = (state: context, action: IActions) => {
  switch (action.type) {
    case "ADD_CART":
      return {
        ...state,
        products: action.payload.products,
        totalCart: action.payload.totalCart,
      };
    case "FEATURED":
      return {
        ...state,
        featured: action.payload,
      };
    default:
      return state;
  }
};

const ProductsProvider: React.FC = ({ children }) => {
  const [productState, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product: IState, qty: number) => {
    let tempCartVal: number = productState.totalCart;
    let temp: IState[] = [...productState.products];

    temp.map((prod: IState) => {
      if (prod.id === product.id) {
        prod.inCart = true;
        tempCartVal += qty * prod.price;
      }
      return prod;
    });

    let newState = {
      products: temp,
      totalCart: tempCartVal,
    };

    dispatch({ type: "ADD_CART", payload: newState });
  };

  const getFeaturedItems = () => {
    let seen: any = {};
    let topPicks: IState[] = [];
    while (topPicks.length < 8) {
      let random = Math.floor(Math.random() * productState.products.length);
      if (!seen[random]) {
        topPicks.push(productState.products[random]);
        seen[random] = true;
      }
    }

    dispatch({ type: "FEATURED", payload: topPicks });
  };

  return (
    <ProductContext.Provider
      value={{
        addToCart,
        products: productState.products,
        totalCart: productState.totalCart.toFixed(2),
        getFeaturedItems,
        featured: productState.featured,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductsProvider;
