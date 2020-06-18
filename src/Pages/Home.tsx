import React, { useEffect } from "react";
import Hero from "../Components/Header/Hero";
import TopPicks from "../Components/Body/TopPicks";
import Bundles from "../Components/Body/Bundles";

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <TopPicks />
      <Bundles />
    </div>
  );
};

export default Home;
