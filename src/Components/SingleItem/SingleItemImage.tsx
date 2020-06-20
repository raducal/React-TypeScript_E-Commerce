import React from "react";
import { IProps } from "./SingleItemInfo";

const SingleItemImage: React.FC<IProps> = ({ state }) => {
  return (
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
  );
};

export default SingleItemImage;
