import React, { useEffect, useState, useContext } from "react";
import Products from "../Components/Body/Products";
import { IState, ProductContext } from "../Context/ProductsContext";
import { useLocation, useHistory } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface State {
  type: string;
  pages: number[];
  currentPage: number;
  currentIndex: number;
  currentConsole: IState[];
  genreArr: IState[];
  displayedArr: IState[];
  genre: any;
}

const ConsoleProducts: React.FC = () => {
  const [state, setState] = useState<State>({
    type: "",
    pages: [],
    currentPage: 1,
    currentIndex: 0,
    currentConsole: [],
    genreArr: [],
    displayedArr: [],
    genre: "",
  });
  const { products, paginateProducts } = useContext(ProductContext);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setConsoleType();
  }, [window.location.pathname]);

  useEffect(() => {
    if (
      state.currentIndex >= 0 &&
      state.currentIndex < state.currentConsole.length
    ) {
      if (state.genre === "all") {
        sliceArr(state.currentConsole);
      } else {
        sliceArr(state.genreArr);
      }
    }
  }, [state.currentIndex]);

  useEffect(() => {
    let sentState: any = history.location.state;
    let newGenre: string = "all";
    let type = state.type;
    let arr: IState[] = [];
    if (sentState.genre !== "all") {
      newGenre = sentState.genre;
    } else if (sentState.specificItem) {
      type = sentState.type;
      arr = getConsoleProducts(type);
    }

    setState((prevState) => ({
      ...prevState,
      genre: newGenre,
      currentIndex: 0,
      currentPage: 1,
      displayedArr: arr,
    }));
  }, [history.location.state]);

  useEffect(() => {
    let tempArr: IState[] = [];

    if (state.type !== "all") {
      if (state.genre === "all") {
        tempArr = state.currentConsole.slice();
      } else {
        for (let product of state.currentConsole) {
          if (product.genre.includes(state.genre)) {
            tempArr.push(product);
          }
        }
      }
    } else {
      tempArr = state.currentConsole.slice();
    }

    setState((prevState) => ({
      ...prevState,
      genreArr: tempArr,
    }));

    sliceArr(tempArr);
  }, [state.genre, state.currentConsole]);

  const setConsoleType = () => {
    let pathname = window.location.pathname.split("/");
    let type = pathname[pathname.length - 1];
    let tempArr = getConsoleProducts(type);
    setState((prevState) => ({
      ...prevState,
      type,
      currentConsole: tempArr,
    }));
  };

  const getConsoleProducts = (type: string) => {
    let tempArr: IState[] = [];

    if (type !== "all") {
      for (let product of products) {
        if (product.consoles === type) {
          tempArr.push(product);
        }
      }
    } else {
      let sentState: any = location.state;
      for (let product of products) {
        if (product.name.includes(sentState.specificItem.name)) {
          tempArr.push(product);
        }
      }
    }

    return tempArr;
  };

  const sliceArr = (currentArr: IState[]) => {
    const [arr, pages] = paginateProducts(currentArr, state.currentIndex);

    let pagesArr = new Array(pages);
    pagesArr.fill(0);

    setState((prevState) => ({
      ...prevState,
      pages: pagesArr,
      displayedArr: arr,
    }));
  };

  const nextPage = () => {
    if (state.currentPage >= 1 && state.currentPage < state.pages.length) {
      setState((prevState) => ({
        ...prevState,
        currentIndex: prevState.currentIndex + 13,
        currentPage: prevState.currentPage + 1,
      }));
    }
  };

  const prevPage = () => {
    if (state.currentPage >= 2 && state.currentPage <= state.pages.length) {
      setState((prevState) => ({
        ...prevState,
        currentIndex: prevState.currentIndex - 13,
        currentPage: prevState.currentPage - 1,
      }));
    }
  };

  const goToPage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let pageNumber: number =
      parseInt((event.target as HTMLButtonElement).innerHTML) - 1;
    setState((prevState) => ({
      ...prevState,
      currentIndex: pageNumber * 13,
      currentPage: pageNumber + 1,
    }));
  };

  return (
    <>
      <Products
        consoleArr={state.displayedArr}
        type={state.type}
        genre={state.genre}
      />
      <div className="pages">
        <div className="pagesButtons">
          {state.currentPage > 1 && (
            <button onClick={prevPage}>
              <IoIosArrowBack />
            </button>
          )}
          {state.pages.length > 1 &&
            state.pages.map((page, i) => {
              let active: any = {};
              if (i + 1 === state.currentPage) active["background"] = "blue";
              return (
                <button onClick={(e) => goToPage(e)} key={i} style={active}>
                  {i + 1}
                </button>
              );
            })}
          {state.currentPage < state.pages.length && (
            <button onClick={nextPage}>
              <IoIosArrowForward />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ConsoleProducts;
