import React, { useState, useEffect, useContext } from "react";
import useWindowSize from "../../utils/useWindowSize";
import { ProductContext, IState } from "../../Context/ProductsContext";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const TopPicksCarousel = () => {
  const [state, setState] = useState({
    screenWidth: 0,
    widthOfItems: -1,
    noOfItems: -1,
    currentItem: 0,
    transitionValue: 0,
  });

  const { width } = useWindowSize();

  const { featured, getFeaturedItems } = useContext(ProductContext);

  useEffect(() => {
    getFeaturedItems();
    let tempWidth = (width / 100) * 80;
    let temp = Math.floor(tempWidth / 200);
    let tempNoOfItems = temp * 200;
    setState((prev) => ({
      ...prev,
      screenWidth: width,
      widthOfItems: tempNoOfItems,
      currentItem: temp,
      noOfItems: temp,
    }));
  }, []);

  // 200 is width of item being used
  useEffect(() => {
    let tempWidth = (width / 100) * 80;
    let temp = Math.floor(tempWidth / 200);
    let tempNoOfItems = temp * 200;
    // let transitionVal =
    //   state.currentItem < state.noOfItems
    //     ? (state.currentItem - temp) * 200
    //     : 0;
    setState((prev) => ({
      ...prev,
      screenWidth: width,
      widthOfItems: tempNoOfItems,
      noOfItems: temp,
      transitionValue: 0,
      currentItem: temp,
    }));
  }, [width]);

  const next = () => {
    let val = state.currentItem;
    let transitionVal = state.transitionValue;
    if (val < featured.length) {
      val = val + 1;
      transitionVal += 200;
    }
    setState((prev) => ({
      ...prev,
      currentItem: val,
      transitionValue: transitionVal,
    }));
  };

  const prev = () => {
    let val = state.currentItem;
    let transitionVal = state.transitionValue;
    if (val > state.noOfItems) {
      val = val - 1;
      transitionVal -= 200;
    }
    setState((prev) => ({
      ...prev,
      currentItem: val,
      transitionValue: transitionVal,
    }));
  };
  return (
    <div className="mainCarouselDiv">
      <div className="carouselBtnDiv">
        <button onClick={prev}>
          <IoIosArrowBack size={30} />
        </button>
      </div>
      <div
        className="carouselSection"
        style={{ maxWidth: `${state.widthOfItems}px` }}
      >
        <div
          className="carouselContainer"
          style={{
            transform: `translateX(-${state.transitionValue}px)`,
            transition:
              "transform 0.45s cubic-bezier(0.455, 0.03, 0.515, 0.955)",
          }}
        >
          <div className="carousel">
            {featured.map((product: IState, i: number) => {
              const itemStyle = {
                backgroundImage: `url(${product.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                height: "70%",
                width: "70%",
              };
              const divStyle = {
                display: "flex",
                height: "100%",
                width: "200px",
                justifyContent: "center",
                alignItems: "center",
              };
              return (
                <Link
                  key={i}
                  to={{
                    pathname: `/products/${product.consoles}/${product.name}`,
                    state: product,
                  }}
                >
                  <div key={i} style={divStyle}>
                    <div style={itemStyle}></div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="carouselBtnDiv">
        <button onClick={next}>
          <IoIosArrowForward size={30} />
        </button>
      </div>
    </div>
  );
};

export default TopPicksCarousel;
