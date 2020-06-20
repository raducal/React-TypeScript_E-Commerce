import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProductContext, IState } from "../../Context/ProductsContext";

interface IProps {
  consoleType: string;
}

const Products: React.FC<IProps> = ({ consoleType }) => {
  const [currentConsole, setCurrentConsole] = useState<IState[]>([]);
  const { products } = useContext(ProductContext);
  const location = useLocation();

  useEffect(() => {
    let tempArr: IState[] = [];

    if (consoleType !== "all") {
      for (let product of products) {
        if (product.consoles === consoleType) {
          tempArr.push(product);
        }
      }
    } else {
      let state: any = location.state;

      for (let product of products) {
        if (product.name.includes(state.name)) {
          tempArr.push(product);
        }
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
