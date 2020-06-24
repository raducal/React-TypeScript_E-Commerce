import React, { createContext, useReducer } from "react";
import products from "../data";

export interface IState {
  id: number;
  name: string;
  price: number;
  genre: string[];
  img: string;
  logo: string;
  consoles: string;
}

interface itemQty {
  id: number;
}

interface hovering {
  console: number | null;
}

interface context {
  products: IState[];
  totalCart: number;
  featured: IState[];
  item: itemQty;
  currentlyHovering: hovering;
}

const initialState = {
  products: [...products],
  totalCart: 0,
  featured: [],
  item: {},
  currentlyHovering: {},
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
        item: { ...action.payload.item },
      };
    case "FEATURED":
      return {
        ...state,
        featured: action.payload,
      };
    case "UPDATE_CART":
      return {
        ...state,
        item: action.payload.newItems,
        totalCart: action.payload.newTotal,
      };
    case "CURRENTLY_HOVERING":
      return {
        ...state,
        currentlyHovering: action.payload,
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

    const addedProduct: any = temp.find((prod: IState) => {
      return prod.id === product.id;
    });

    tempCartVal += addedProduct.price * qty;
    let item = { ...productState.item };

    if (!item[addedProduct.id]) {
      item[addedProduct.id] = qty;
    } else {
      item[addedProduct.id] += qty;
    }

    let newState = {
      products: temp,
      totalCart: tempCartVal,
      item,
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

  const paginateProducts = (products: IState[], current: number) => {
    let limit: number = 12;
    let newProducts = products.slice(current, current + limit);
    let pages: number = Math.ceil(products.length / limit);
    return [newProducts, pages];
  };

  const removeItemFromCart = (product: IState) => {
    let newItems = { ...productState.item };
    let qty = newItems[product.id];
    let removeFromTotal = product.price * qty;
    let newTotal = productState.totalCart - removeFromTotal;
    if (newTotal < 0) {
      newTotal = 0;
    }
    delete newItems[product.id];
    dispatch({ type: "UPDATE_CART", payload: { newItems, newTotal } });
  };

  const setCurrentlyHovering = (console: string, activeGenreID: number) => {
    let newCurrentlyHovering: any = { ...productState.currentlyHovering };
    newCurrentlyHovering[console] = activeGenreID;
    for (let active in newCurrentlyHovering) {
      if (console !== active) {
        newCurrentlyHovering[active] = null;
      }
    }

    dispatch({ type: "CURRENTLY_HOVERING", payload: newCurrentlyHovering });
  };

  return (
    <ProductContext.Provider
      value={{
        addToCart,
        products: productState.products,
        totalCart: productState.totalCart.toFixed(2),
        getFeaturedItems,
        featured: productState.featured,
        items: productState.item,
        paginateProducts,
        removeItemFromCart,
        setCurrentlyHovering,
        currentlyHovering: productState.currentlyHovering,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductsProvider;
