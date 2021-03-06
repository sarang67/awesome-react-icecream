import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import AddIceCream from "./ice-cream/AddIceCream";
import EditIceCream from "./ice-cream/EditIcecream";
import IceCreams from "./ice-cream/iceCreams";
import Menu from "./ice-cream/Menu";
import Footer from "./structure/Footer";
import Header from "./structure/Header";
import "./styles/ice-cream.css";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={Menu} exact />
        <Route path="/ice-creams" component={IceCreams} />
        <Route path="/menu-items/add" component={AddIceCream} exact />
        <Route path="/menu-item/:menuItemId" component={EditIceCream} exact />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
