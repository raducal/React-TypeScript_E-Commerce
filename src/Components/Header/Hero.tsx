import React, { useState, useEffect } from "react";
import ps5 from "../../images/PS5.jpg";
import ps52 from "../../images/ps52.jpg";
import xbox from "../../images/xbox.jpg";

const Hero: React.FC = () => {
  const [images, setImages] = useState([xbox, ps5]);
  const [current, setCurrent] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  useEffect(() => {
    let interval: any;
    interval = setInterval(() => {
      if (current < images.length - 1) {
        setCurrent(current + 1);
        setTranslateValue(translateValue - 100);
        clearInterval(interval);
      } else if (current === images.length - 1) {
        setCurrent(0);
        setTranslateValue(0);
        clearInterval(interval);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="slider">
      <div
        className="slider-wrapper"
        style={{
          transform: `translateX(-${current * (100 / images.length)}%)`,
          width: `${images.length}*100%`,
        }}
      >
        {images.map((image, i) => {
          return (
            <div
              key={i}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                width: "100vw",
                height: "100%",
              }}
            ></div>
          );
        })}
      </div>
    </div>
    // <div style={{ overflow: "hidden", width: "90%", margin: "auto" }}>
    //   <div
    //     className="heroDiv"
    //     style={{
    //       display: "flex",
    //       transform: `translateX(${translateValue}%)`,
    //     }}
    //   >
    //     {images.map((image, i) => {
    //       return (
    //         <div
    //           style={{
    //             height: "100%",
    //             width: "100%",
    //           }}
    //           key={i}
    //         >
    //           <img className="img" src={image} alt={"alt"} />
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
};

export default Hero;
