import React, { useEffect, useState, useContext } from "react";
import { ProductContext } from "../Context/ProductsContext";

interface IProps {
  currentConsole: string;
  children: any;
}

const Genres: React.FC<IProps> = ({ currentConsole, children }) => {
  const { products } = useContext(ProductContext);
  const [genreItems, setGenreItems] = useState<string[]>([]);

  const childrenWithProps = React.cloneElement(children, {
    genreItems,
  });

  useEffect(() => {
    updateGenres();
  }, [currentConsole]);

  const updateGenres = () => {
    let temp: any = new Set();

    for (let product of products) {
      if (product.consoles === currentConsole) {
        temp.add(...product.genre);
      }
    }

    setGenreItems([...temp]);
  };

  return <>{childrenWithProps}</>;
};

export default Genres;
