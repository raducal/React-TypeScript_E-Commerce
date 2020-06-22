import React, { useEffect, useContext, useState } from "react";
import { ProductContext, IState } from "../../Context/ProductsContext";
import { Link } from "react-router-dom";

interface IProps {
  currentConsole: string;
}

const Dropdown: React.FC<IProps> = ({ currentConsole }) => {
  const { products } = useContext(ProductContext);
  const [consoleProducts, setConsoleProducts] = useState<IState[]>([]);
  const [dowpdownItems, setDowpdownItems] = useState<string[]>([]);

  useEffect(() => {
    updateGenres();
  }, [currentConsole]);

  const updateGenres = () => {
    let temp: any = new Set();
    let tempArr: IState[] = [];

    for (let product of products) {
      if (product.consoles === currentConsole) {
        tempArr.push(product);
        temp.add(...product.genre);
      }
    }

    setDowpdownItems([...temp]);
    setConsoleProducts(tempArr);
  };

  return (
    <>
      {dowpdownItems.length > 0 && (
        <ul className="dropdown-content">
          {currentConsole.length > 0 &&
            dowpdownItems.map((item: string, i: number) => {
              return (
                <li key={i}>
                  <Link
                    to={{
                      pathname: `/products/${currentConsole}`,
                      state: { genre: item },
                    }}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
};

export default Dropdown;
