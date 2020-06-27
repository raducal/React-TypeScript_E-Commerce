import React, { useContext, useEffect } from "react";
import Hero from "../Components/Header/Hero";
import TopPicksCarousel from "../Components/Body/TopPicksCarousel";
import Bundles from "../Components/Body/Bundles";
import { ProductContext } from "../Context/ProductsContext";

const Home: React.FC = () => {
  const { setCurrentlyHovering } = useContext(ProductContext);

  useEffect(() => {
    setCurrentlyHovering(null, null);
  }, []);

  return (
    <div>
      <Hero />
      <TopPicksCarousel />
      <Bundles />
    </div>
  );
};

export default Home;
