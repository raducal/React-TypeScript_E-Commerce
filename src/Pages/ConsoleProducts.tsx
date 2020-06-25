import React, { useEffect, useState, useContext } from "react";
import Products from "../Components/Body/Products";
import { IState, ProductContext } from "../Context/ProductsContext";
import { useLocation, useHistory } from "react-router-dom";
import PoductsPagination from "../Components/Body/PoductsPagination";
import Genres from "../Components/Genres";
import FilterGenres from "../Components/Body/FilterGenres";

export interface IBundle {
  id: number;
  name: string;
  price: number;
  img: string;
  logo: string;
  consoles: string;
}

interface State {
  type: string;
  pages: number[];
  currentPage: number;
  currentIndex: number;
  currentConsole: IState[] | any;
  genreArr: IState[];
  displayedArr: IState[] | IBundle[];
  genre: any;
  genreClassAppear: boolean;
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
    genreClassAppear: false,
  });
  const { products, paginateProducts, bundles } = useContext(ProductContext);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (state.type === "bundles") {
      setState({
        ...state,
        displayedArr: bundles,
        currentConsole: bundles,
        genre: "all",
      });
    }
  }, [state.type]);

  useEffect(() => {
    setConsoleType();
    // console.log("useEffect pathname");
  }, [window.location.pathname]);

  useEffect(() => {
    // console.log("useEffect currentIndex", state);
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
    let currFlag = false;
    let genreFlag = false;
    let arr: IState[] = [];
    if (sentState.genre !== "all") {
      newGenre = sentState.genre;
      if (sentState.specificItem) {
        type = sentState.type;
        arr = getConsoleProducts(type);
      } else {
        genreFlag = true;
      }
    } else if (sentState.genre === "all") {
      currFlag = true;
    }

    setState((prevState) => ({
      ...prevState,
      genre: newGenre,
      currentIndex: 0,
      currentPage: 1,
      displayedArr: arr,
    }));

    if (currFlag) {
      sliceArr(state.currentConsole);
    } else if (genreFlag) {
      sliceArr(state.genreArr);
    }
  }, [history.location.state]);

  useEffect(() => {
    let tempArr: IState[] = [];
    // console.log("useEffect genre currentConsole");

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
    // console.log("setConsoleType");
    setState((prevState) => ({
      ...prevState,
      type,
      currentConsole: tempArr,
    }));
  };

  const getConsoleProducts = (type: string) => {
    let tempArr: IState[] = [];
    // console.log("getConsoleProducts");

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
    // console.log("sliceArr");
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

  const showGenres = () => {
    setState((prevState) => ({
      ...prevState,
      genreClassAppear: !state.genreClassAppear,
    }));
  };

  return (
    <>
      <div className="productsAndFilter">
        <div className="filter">
          <div className="productSideFilter">
            <button onClick={showGenres} className="filterBtns">
              Genres
            </button>
            <div
              className={`genresAppear`}
              style={{ display: state.genreClassAppear ? "block" : "none" }}
            >
              {state.displayedArr[0] &&
                (state.type === "bundle" ? (
                  <Genres currentConsole={"all"}>
                    <FilterGenres currentConsole={"all"} />
                  </Genres>
                ) : (
                  <Genres
                    currentConsole={state.displayedArr[0].consoles.toLowerCase()}
                  >
                    <FilterGenres
                      currentConsole={state.displayedArr[0].consoles.toLowerCase()}
                    />
                  </Genres>
                ))}
            </div>
          </div>
        </div>
        <div className="productsAndPagination">
          <h3>{state.type.toUpperCase()} Games</h3>
          <Products consoleArr={state.displayedArr} type={state.type} />
          <PoductsPagination
            goToPage={goToPage}
            prevPage={prevPage}
            nextPage={nextPage}
            currentPage={state.currentPage}
            pages={state.pages}
          />
        </div>
      </div>
    </>
  );
};

// const SideFilter = () => {
//   const [genreClassAppear, setGenreClassAppear] = useState(false);

//   const showGenres = () => {
//     setGenreClassAppear(!genreClassAppear);
//   };

//   return(
//     <div className="productSideFilter">
//       <button onClick={showGenres} className="filterBtns">
//         Genres
//             </button>
//       <div
//         className={`genresAppear`}
//         style={{ display: genreClassAppear ? "block" : "none" }}
//       >
//         {state.displayedArr[0] &&
//           (state.type === "bundle" ? (
//             <Genres currentConsole={"all"}>
//               <FilterGenres currentConsole={"all"} />
//             </Genres>
//           ) : (
//               <Genres
//                 currentConsole={state.displayedArr[0].consoles.toLowerCase()}
//               >
//                 <FilterGenres
//                   currentConsole={state.displayedArr[0].consoles.toLowerCase()}
//                 />
//               </Genres>
//             ))}
//       </div>
//     </div>
//   )
// }

export default ConsoleProducts;
