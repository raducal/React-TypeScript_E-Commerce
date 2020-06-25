import React, { useContext, useEffect } from "react";
import Hero from "../Components/Header/Hero";
import TopPicks from "../Components/Body/TopPicks";
import Bundles from "../Components/Body/Bundles";
import Contect from "../Components/Body/Contact";
import { ProductContext } from "../Context/ProductsContext";

const Home: React.FC = () => {
  const { setCurrentlyHovering } = useContext(ProductContext);

  useEffect(() => {
    setCurrentlyHovering(null, null);
  }, []);

  return (
    <div>
      <Hero />
      <TopPicks />
      <Bundles />
      <Contect />
    </div>
  );
};

export default Home;
