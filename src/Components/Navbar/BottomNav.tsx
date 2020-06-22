import React, { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { ProductContext, IState } from "../../Context/ProductsContext";

import NavbarLinks from "./NavbarLinks";

const BottomNav: React.FC = () => {
  const { products } = useContext(ProductContext);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<IState[]>([]);
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    let suggestions: IState[] = [];

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = products.sort().filter((item: IState) => {
        if (regex.test(item.name)) {
          return item;
        }
      });
    }
    setSearch(value);
    setSuggestions(suggestions);
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    let item: IState = products.find(
      (product: IState) => product.name.toLowerCase() === search.toLowerCase()
    );

    if (item) {
      history.push({
        pathname: `/products/all`,
        state: { specificItem: item, type: "all" },
      });
    }
    setSearch("");
  };

  const clickSuggestion = (suggestion: string) => {
    setSearch(suggestion);
    setSuggestions([]);
  };

  return (
    <div style={{ position: "relative" }}>
      <nav className="bottomNav activeUnderline">
        <p>
          <Link to="/">GamerLife</Link>
        </p>
        <NavbarLinks />
        <div className="searchDiv">
          <form className="searchForm" onSubmit={(e) => handleSubmit(e)}>
            <input
              onChange={handleChange}
              value={search}
              className="searchBar"
              type="text"
              placeholder="Search"
            />
            <button onSubmit={(e) => handleSubmit(e)}>
              <FaSearch />
            </button>
          </form>
          <div className="suggestionDiv">
            <ul>
              {suggestions.map((suggestion: IState) => (
                <li onClick={() => clickSuggestion(suggestion.name)}>
                  {suggestion.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
