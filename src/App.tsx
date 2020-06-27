import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Pages/Home";
import ConsoleProducts from "./Pages/ConsoleProducts";
import Navbar from "./Components/Navbar/Navbar";
import SingleItem from "./Pages/SingleItem";
import Cart from "./Components/Body/Cart";
import Contact from "./Components/Body/Contact";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/:type" component={ConsoleProducts} />
          <Route exact path="/products/:type/:item" component={SingleItem} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
        <Contact />
      </Router>
    </>
  );
};

export default App;
