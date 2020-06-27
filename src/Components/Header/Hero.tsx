import React, { useState, useEffect } from "react";
import ps5 from "../../images/PS5.jpg";
import ps52 from "../../images/ps52.jpg";
import xbox from "../../images/xbox.jpg";

const Hero: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [current, setCurrent] = useState<number>(-1);

  useEffect(() => {
    setImages([xbox, ps52]);
    setCurrent(0);
  }, []);

  useEffect(() => {
    let slideInterval: any;
    slideInterval = setInterval(() => {
      if (images[current + 1]) {
        setCurrent(current + 1);
        clearInterval(slideInterval);
      } else if (current === images.length - 1) {
        setCurrent(0);
        clearInterval(slideInterval);
      }
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [current]);

  return (
    <div className="slider">
      {images.map((image, i) => {
        return (
          <div
            key={i}
            className={`slide ${i === current ? "current" : ""}`}
            // style={{
            //   background: `url(${image}) no-repeat center center/cover`,
            // }}
          >
            <img src={image} alt="img" />
          </div>
        );
      })}
    </div>
  );
};

export default Hero;
