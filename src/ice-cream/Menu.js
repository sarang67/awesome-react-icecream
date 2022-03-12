import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { getMenu } from "../data/iceCreamData";
import LoaderMessage from "../structure/LoaderMessage";

import propTypes from "prop-types";
import IceCreamCard from "./IceCreamCard";
import IceCreamCardContainer from "./IceCreamCardContainer";

const Menu = ({ history }) => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getMenu().then((menudata) => {
      if (isMounted) {
        setMenu(menudata);
        setIsLoading(false);
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
      <LoaderMessage loadingMessage="Loading Menu." isLoading={isLoading} />
      {menu.length > 0 ? (
        <IceCreamCardContainer>
          {menu.map(
            ({ id, iceCream, inStock, quantity, price, description }) => {
              return (
                <IceCreamCard
                  key={id.toString()}
                  iceCreamId={iceCream.id}
                  heading={iceCream.name}
                  to={`/menu-item/${id.toString()}`}
                  history={history}
                >
                  <div className="content card-content">
                    <p className="price">{`$${price.toFixed(2)}`}</p>
                    <p className={`stock${inStock ? "" : " out"}`}>
                      {inStock
                        ? `${quantity} in stock`
                        : "currently out of stock !!!"}
                    </p>
                    <p className="description">{description}</p>
                  </div>
                </IceCreamCard>
              );
            }
          )}
        </IceCreamCardContainer>
      ) : (
        !isLoading && <p>Menu is Empty ! the sadness :( !!! </p>
      )}
    </main>
  );
};

Menu.prototype = {
  history: propTypes.shape({ push: propTypes.func.isRequired }),
};
export default Menu;
