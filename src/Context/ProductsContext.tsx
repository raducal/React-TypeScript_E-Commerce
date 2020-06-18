import React, { createContext, useReducer, useEffect } from "react";
import allProducts from "../data";

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
}

const initialState = {
  products: [...allProducts],
};

interface IActions {
  type: string;
  payload: any;
}

export const ProductContext = createContext<context | any>(initialState);

const reducer: React.Reducer<any, any> = (state: context, action: IActions) => {
  switch (action.type) {
    case "ADD_CART":
      console.log(action.payload);
      break;
  }
};

const ProductsProvider: React.FC = ({ children }) => {
  const [productState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(productState.products);
  }, []);

  const addToCart = () => {
    dispatch({ type: "ADD_CART", payload: "Hello" });
  };
  return (
    <ProductContext.Provider
      value={{ addToCart, products: productState.products }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductsProvider;
