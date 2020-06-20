import React, { useRef, createRef, useState } from "react";
import { Link } from "react-router-dom";

import Dropdown from "./Dropdown";

const NavbarLinks = () => {
  let consoleArr: string[] = ["PS4", "Switch", "Xbox One", "Bundles"];

  const currentRef: any = useRef(consoleArr.map(() => createRef()));
  const [dropdownPos, setDropdownPos]: any = useState([]);

  const showDropDown = (index: number) => {
    let left = currentRef.current[index].current.getBoundingClientRect().left;
    let top = currentRef.current[index].current.getBoundingClientRect().top;
    let pos = [left, top];
    setDropdownPos(pos);
  };

  return (
    <div className="menu">
      <ul className="nav-links">
        {consoleArr.map((console: string, i: number) => {
          return (
            <li>
              <Link
                ref={currentRef.current[i]}
                onMouseOver={() => showDropDown(i)}
                to={`/products/${console.toLowerCase()}`}
                className="nav-link"
              >
                {console}
              </Link>
            </li>
          );
        })}
      </ul>
      <Dropdown dropdownPos={dropdownPos} />
    </div>
  );
};

export default NavbarLinks;
