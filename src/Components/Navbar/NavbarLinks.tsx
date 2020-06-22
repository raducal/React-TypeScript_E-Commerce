import React, { useRef, createRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Dropdown from "./Dropdown";

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
              <Dropdown currentConsole={currentConsoleHover} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NavbarLinks;
