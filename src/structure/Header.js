import React from "react";
import icecream from "../assets/img/ultimate-ice-cream.svg";

const Header = () => {
  return (
    <header>
      <h1>
        <img src={icecream} alt="" />
        Awesome ice cream.
      </h1>
    </header>
  );
};

export default Header;
