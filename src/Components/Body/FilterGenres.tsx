import React from "react";

import { MapGenres, IProps } from "../Navbar/Dropdown";

const FilterGenres: React.FC<IProps> = ({ genreItems, currentConsole }) => {
  return (
    <div>
      <ul>
        <MapGenres currentConsole={currentConsole} genreItems={genreItems} />
      </ul>
    </div>
  );
};

export default FilterGenres;
