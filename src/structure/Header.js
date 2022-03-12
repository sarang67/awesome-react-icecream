import React from "react";
import { Link, NavLink } from "react-router-dom";
import icecream from "../assets/img/ultimate-ice-cream.svg";

const Header = () => {
  return (
    <header>
      <h1>
        <img src={icecream} alt="" />
        Awesome ice cream.
      </h1>
      <nav>
        <ul>
          <NavLink to="/" activeClassName="active" exact>
            Menu
          </NavLink>
          <NavLink to="/ice-creams" activeClassName="active" exact>
            Add Ice Cream
          </NavLink>

          {/* <Link to="/" exact>
            Menu
          </Link> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
