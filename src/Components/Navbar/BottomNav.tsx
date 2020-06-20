import React, { useState, useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, Redirect, useHistory } from "react-router-dom";
import { ProductContext, IState } from "../../Context/ProductsContext";

const BottomNav: React.FC = () => {
  const { products } = useContext(ProductContext);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const history = useHistory();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    let suggestions = [];

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
      history.push({ pathname: `/products/all`, state: { ...item } });
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
        <ul className="nav-links">
          <li>
            <Link to="/products/ps4">PS4</Link>
          </li>
          <li>
            <Link to="/products/switch">Switch</Link>
          </li>
          <li>
            <Link to="/products/xbox">Xbox One</Link>
          </li>
          <li>
            <Link to="/products/bundles">Bundles</Link>
          </li>
        </ul>
        <form className="searchDiv" onSubmit={(e) => handleSubmit(e)}>
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
      </nav>
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
  );
};

export default BottomNav;
