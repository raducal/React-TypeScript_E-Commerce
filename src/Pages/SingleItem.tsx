import React, { useEffect, useContext } from "react";

import { ProductContext, IState } from "../Context/ProductsContext";

import SimilarItem from "../Components/Body/SimilarItem";
import SingleItemInfo from "../Components/SingleItem/SingleItemInfo";
import SingleItemImage from "../Components/SingleItem/SingleItemImage";

const SingleItem: React.FC<any> = ({ location: { state } }) => {
  const { featured, getFeaturedItems } = useContext(ProductContext);

  useEffect(() => {
    getFeaturedItems();
  }, [window.location.pathname]);

  return (
    <div className="singleItem">
      {/* game image */}
      <div className="singleItemContent">
        <SingleItemImage state={state} />
        {/* other game info */}
        <SingleItemInfo state={state} />
      </div>
      <div className="singleItemSimilarContent">
        <p>You might also like</p>
        <div className="singleItemSimilar">
          {featured.map((product: IState, i: number) => {
            return <SimilarItem product={product} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
