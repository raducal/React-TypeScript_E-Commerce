import React from "react";

interface IProps {
  dropdownPos: number[];
}

const Dropdown: React.FC<IProps> = ({ dropdownPos }) => {
  return (
    <div
      style={{
        top: `${dropdownPos[1]}px`,
        left: `${dropdownPos[0]}px`,
      }}
      className="dropDown"
    >
      Hello World
    </div>
  );
};

export default Dropdown;
