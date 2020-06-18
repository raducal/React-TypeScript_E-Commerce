import React from "react";
import bundles from "../../images/consolebundles.jpg";
import { Link } from "react-router-dom";

const Bundles = () => {
  return (
    <div className="bundles">
      <div className="bundlesContainer">
        <div className="bundlesContent">
          <h3>Console Bundle Deals</h3>
          <p>
            Play your way and experience the power of gaming at home or on the
            go
          </p>
          <Link to="/products/bundles">Shop All</Link>
        </div>
        <img src={bundles} alt="" />
      </div>
    </div>
  );
};

export default Bundles;
