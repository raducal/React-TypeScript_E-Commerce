import React from "react";

const CustomSelect = () => {
  return (
    <div className="singleItemInfoSelect">
      <select name="Platform" id="selectplatform">
        <option selected disabled>
          Choose a Platform
        </option>
        <option value="1">PS4</option>
        <option value="2">Xbox</option>
      </select>
    </div>
  );
};

export default CustomSelect;
