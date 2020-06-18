import React, { useState, useEffect } from "react";
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

const Navbar: React.FC = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let pathname = window.location.pathname.split("/");
  });

  return (
    <div className="navbar">
      <TopNav />
      <BottomNav />
    </div>
  );
};

export default Navbar;
