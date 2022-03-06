import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { getMenuItem, putMenuItem } from "../data/iceCreamData";
import LoaderMessage from "../structure/LoaderMessage";

import IceCreamImage from "./IceCreamImage";
import "../styles/forms-spacer.css";
import useUniqueIds from "../hooks/useUniqueIds";

const EditIceCream = ({ match, history }) => {
  const [menuItem, setMenuItem] = useState({
    price: "0.00",
    inStock: true,
    quantity: "0",
    description: "",
    iceCream: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(true);

  const [descriptionId, stockId, quantityId, priceId] = useUniqueIds(4);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getMenuItem(match.params.menuItemId)
      .then(({ id, price, inStock, quantity, description, iceCream }) => {
        if (isMounted.current) {
          setMenuItem({
            id,
            price: price.toFixed(2),
            inStock,
            quantity: quantity.toString(),
            description,
            iceCream,
          });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 404 && isMounted.current) {
          history.replace("/");
        }
      });
  }, [match.params.menuItemId, history]);

  console.log(menuItem);

  const onChangeHandler = (e) => {
    let newMenuItemData = {
      ...menuItem,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    if (e.target.name === "quantity") {
      newMenuItemData.inStock = e.target.value !== "0";
    }

    if (e.target.name === "inStock" && !e.target.checked) {
      newMenuItemData.quantity = "0";
    }

    setMenuItem(newMenuItemData);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const { id, price, inStock, quantity, description, iceCream } = menuItem;
    const submitItem = {
      id,
      iceCream,
      price: parseFloat(price),
      inStock,
      quantity: parseInt(quantity),
      description,
    };

    putMenuItem(submitItem).then(() => {
      history.push("/", { focus: true });
    });
  };

  return (
    <main>
      <Helmet>
        <title>Update this component | Awesome Ice Cream </title>
      </Helmet>
      <h2 className="main-heading">
        Edit ice cream component Update this component
      </h2>
      <LoaderMessage loadingMsg="Loading ice cream." isLoading={isLoading} />

      {!isLoading && (
        <div className="form-frame">
          <div className="image-container">
            <IceCreamImage iceCreamId={menuItem.iceCream.id} />
          </div>
          <div className="form-container">
            <dl>
              <dt>Name :</dt>
              <dd>{menuItem.iceCream.name}</dd>
            </dl>
            <form onSubmit={onSubmitHandler}>
              <label htmlFor={descriptionId}>Description :</label>
              <textarea
                id={descriptionId}
                name="description"
                rows="3"
                onChange={onChangeHandler}
                value={menuItem.description}
              />
              <label htmlFor={stockId}>In Stock :</label>
              <div className="checkbox-wrapper">
                <input
                  id={stockId}
                  type="checkbox"
                  name="inStock"
                  onChange={onChangeHandler}
                  checked={menuItem.inStock}
                />
                <div className="checkbox-wrapper-checked" />
              </div>
              <label htmlFor={quantityId}>Quantity :</label>
              <select
                id={quantityId}
                name="quantity"
                onChange={onChangeHandler}
                value={menuItem.quantity}
              >
                <option value="0">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <label htmlFor={priceId}>Price :</label>
              <input
                id={priceId}
                type="number"
                step="0.01"
                name="price"
                onChange={onChangeHandler}
                value={menuItem.price}
              />
              <div className="button-container">
                <button className="ok" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

EditIceCream.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
};

export default EditIceCream;
