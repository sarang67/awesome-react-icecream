import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { getMenu } from "../data/iceCreamData";
import LoaderMessage from "../structure/LoaderMessage";
import IcecreamImage from "./IceCreamImage";
import propTypes from "prop-types";

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

  const onItemClickhandler = (to) => {
    console.log(to);
    history.push(to);
  };

  const onLinkClickhandler = (event) => {
    event.stopPropagation();
  };

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
        <ul className="container">
          {menu.map(
            ({ id, iceCream, inStock, quantity, price, description }) => {
              return (
                <li key={id.toString()}>
                  <section
                    className="card"
                    onClick={() =>
                      onItemClickhandler(`/menu-item/${id.toString()}`)
                    }
                  >
                    <div className="image-container">
                      <IcecreamImage iceCreamId={iceCream.id} />
                    </div>
                    <div className="text-container">
                      <h3>
                        <Link
                          to={`/menu-item/${id.toString()}`}
                          onClick={onLinkClickhandler}
                        >
                          {iceCream.name}
                        </Link>
                      </h3>
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
        !isLoading && <p>Menu is Empty ! the sadness :( !!! </p>
      )}
    </main>
  );
};

Menu.prototype = {
  history: propTypes.shape({ push: propTypes.func.isRequired }),
};
export default Menu;
