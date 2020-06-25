import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../Context/ProductsContext";

export interface IProps {
  currentConsole: string;
  genreItems?: any;
}

const Dropdown: React.FC<IProps> = ({ currentConsole, genreItems }) => {
  return (
    <>
      {genreItems.length > 0 && (
        <ul className="dropdown-content">
          {currentConsole.length > 0 && (
            <MapGenres
              currentConsole={currentConsole}
              genreItems={genreItems}
            />
          )}
        </ul>
      )}
    </>
  );
};

export const MapGenres: React.FC<IProps> = ({ currentConsole, genreItems }) => {
  const { setCurrentlyHovering, currentlyHovering } = useContext(
    ProductContext
  );
  return genreItems.map((item: string, i: number) => {
    return (
      <li
        style={{
          background:
            currentlyHovering[currentConsole] === i
              ? `rgb(133, 42, 42)`
              : "#fff",
        }}
        key={i}
        className="filterListItem"
      >
        <Link
          style={{
            color: currentlyHovering[currentConsole] === i ? `#fff` : "#000",
          }}
          to={{
            pathname: `/products/${currentConsole}`,
            state: { genre: item },
          }}
          onClick={() => setCurrentlyHovering(currentConsole, i)}
        >
          {item}
        </Link>
      </li>
    );
  });
};

export default Dropdown;
