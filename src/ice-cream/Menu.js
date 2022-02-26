import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getMenu } from "../data/iceCreamData";
import IcecreamImage from "./IceCreamImage";

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getMenu().then((menudata) => {
      if (isMounted) {
        setMenu(menudata);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main>
      <Helmet>
        <title>
          Rock your taste buds with one of these | Awesome ice cream
        </title>
      </Helmet>

      <h2 className="main-heading">Rock your taste buds with one of these</h2>

      {menu.length > 0 ? (
        <ul className="container">
          {menu.map(
            ({ id, iceCream, inStock, quantity, price, description }) => {
              return (
                <li key={id.toString()}>
                  <section className="card">
                    <div className="image-container">
                      <IcecreamImage iceCreamId={id} />
                    </div>
                    <div className="text-container">
                      <h3>{iceCream.name}</h3>
                      <div className="content card-content">
                        <p className="price">{`$${price.toFixed(2)}`}</p>
                        <p className={`stock${inStock ? "" : " out"}`}>
                          {inStock
                            ? `${quantity} in stock`
                            : "currently out of stock !!!"}
                        </p>
                        <p className="description">{description}</p>
                      </div>
                    </div>
                  </section>
                </li>
              );
            }
          )}
        </ul>
      ) : (
        <p>Menu is Empty ! the sadness :( !!! </p>
      )}
    </main>
  );
};

export default Menu;
