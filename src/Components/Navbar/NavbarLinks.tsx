import React, { useState } from "react";
import { Link } from "react-router-dom";

import Dropdown from "./Dropdown";
import Genres from "../Genres";
import { ProductContext } from "../../Context/ProductsContext";

const NavbarLinks = () => {
  let consoleArr: string[] = ["PS4", "Switch", "Xbox One", "Bundles"];
  const [currentConsoleHover, setCurrentConsoleHover] = useState("");

  return (
    <div className="menu">
      <ul className="nav-links">
        {consoleArr.map((console: string, i: number) => {
          return (
            <li
              key={i}
              className="dropdown"
              onMouseOver={() => setCurrentConsoleHover(console.toLowerCase())}
            >
              <Link
                to={{
                  pathname: `/products/${console.toLowerCase()}`,
                  state: { genre: "all" },
                }}
              >
                {console}
              </Link>
              <Genres currentConsole={currentConsoleHover}>
                <Dropdown currentConsole={currentConsoleHover} />
              </Genres>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavbarLinks;
