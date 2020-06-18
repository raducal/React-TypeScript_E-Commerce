import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext, IState } from "../../Context/ProductsContext";

interface IProps {
  consoleType: string;
}

const Products: React.FC<IProps> = ({ consoleType }) => {
  const [currentConsole, setCurrentConsole] = useState<IState[]>([]);
  const { products } = useContext(ProductContext);

  useEffect(() => {
    let tempArr: IState[] = [];

    for (let product of products) {
      if (product.consoles === consoleType) {
        tempArr.push(product);
      }
    }

    setCurrentConsole(tempArr);
  }, [consoleType]);

  return (
    <div className="products">
      {currentConsole.map((product) => {
        return (
          <div key={product.id} className="product">
            <Link
              to={{
                pathname: `/products/${consoleType}/${product.name}`,
                state: product,
              }}
            >
              <img className="productImg" src={product.img} alt="img" />
            </Link>
            <div className="productName">{product.name}</div>
            <div className="consoles">
              <img
                className="consoleLogo"
                src={product.logo}
                alt="Console Logo"
              />
            </div>
            <div className="productPrice">${product.price}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
