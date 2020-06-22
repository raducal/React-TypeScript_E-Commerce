import React from "react";
import { Link } from "react-router-dom";
import { IState } from "../../Context/ProductsContext";

interface IProps {
  product: IState;
}

const SimilarItem: React.FC<IProps> = ({ product }) => {
  return (
    <div className="singleItemFeaturedProduct">
      <Link
        to={{
          pathname: `/products/${product.consoles}/${product.name}`,
          state: product,
        }}
      >
        <img
          style={{
            maxWidth: "100%",
            maxHeight: "200px",
            margin: "5px 0",
          }}
          src={product.img}
          alt="img"
        />
      </Link>
      <div className="singleItemFeaturedProductInfo">
        <p>{product.name}</p>
        <p>${product.price}</p>
      </div>
    </div>
  );
};

export default SimilarItem;
