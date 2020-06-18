import React, { useEffect, useState } from "react";
import Products from "../Components/Body/Products";

const ConsoleProducts: React.FC = () => {
  const [type, setType] = useState("");

  useEffect(() => {
    setConsoleType();
  }, [window.location.pathname]);

  const setConsoleType = () => {
    let pathname = window.location.pathname.split("/");
    setType(pathname[pathname.length - 1]);
  };

  return (
    <>
      <Products consoleType={type} />
    </>
  );
};

export default ConsoleProducts;
