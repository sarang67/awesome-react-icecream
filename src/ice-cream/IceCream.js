import React, { useState, useEffect } from "react";
import {
  validateDescription,
  validateQuantity,
  validatePrice,
} from "../utils/validators";
import useValidators from "../hooks/useValidation";

import useUniqueIds from "../hooks/useUniqueIds";
import ErrorContainer from "./ErrorContainer";
import IcecreamImage from "./IceCreamImage";

const IceCream = ({
  iceCream = {},
  price = 0,
  quantity = 0,
  inStock = true,
  description = "",
  onDelete,
  onSubmit,
}) => {
  const [descriptionId, stockId, quantityId, priceId] = useUniqueIds(4);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [internalData, setInternalData] = useState({
    price: "0.00",
    inStock: true,
    quantity: "0",
    description: "",
  });

  const descriptionError = useValidators(
    internalData.description,
    validateDescription
  );

  const quantityError = useValidators(
    internalData.quantity,
    validateQuantity,
    internalData.inStock
  );

  const priceError = useValidators(internalData.price, validatePrice);

  useEffect(() => {
    setInternalData({
      price: price.toFixed(2),
      inStock,
      quantity: quantity.toString(),
      description,
    });
  }, [price, quantity, inStock, description]);

  const onSubmitHandler = (e) => {
    setHasSubmitted(true);

    console.log(descriptionError);
    console.log(quantityError);
    console.log(priceError);

    e.preventDefault();
    if (!descriptionError && !quantityError && !priceError) {
      onSubmit({
        iceCream: { id: iceCream.id, name: iceCream.name },
        price: parseFloat(internalData.price),
        inStock: internalData.inStock,
        quantity: parseInt(internalData.quantity),
        description: internalData.description,
      });
    }
  };

  const onChangeHandler = (e) => {
    let newMenuItemData = {
      ...internalData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    if (e.target.name === "quantity") {
      newMenuItemData.inStock = e.target.value !== "0";
    }

    if (e.target.name === "inStock" && !e.target.checked) {
      newMenuItemData.quantity = "0";
    }

    setInternalData(newMenuItemData);
  };

  return (
    <div className="form-frame">
      <div className="image-container">
        <IcecreamImage iceCreamId={iceCream.id} />
      </div>
      <div className="form-container">
        <dl>
          <dt>Name :</dt>
          <dd>{iceCream.name}</dd>
        </dl>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor={descriptionId}>Description :</label>
          <ErrorContainer
            errorText={descriptionError}
            hasSubmitted={hasSubmitted}
          >
            <textarea
              id={descriptionId}
              name="description"
              rows="3"
              onChange={onChangeHandler}
              value={internalData.description}
            />
          </ErrorContainer>

          <label htmlFor={stockId}>In Stock :</label>
          <div className="checkbox-wrapper">
            <input
              id={stockId}
              type="checkbox"
              name="inStock"
              onChange={onChangeHandler}
              checked={internalData.inStock}
            />
            <div className="checkbox-wrapper-checked" />
          </div>
          <label htmlFor={quantityId}>Quantity :</label>
          <ErrorContainer errorText={quantityError} hasSubmitted={hasSubmitted}>
            <select
              id={quantityId}
              name="quantity"
              onChange={onChangeHandler}
              value={internalData.quantity}
            >
              <option value="0">0</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </ErrorContainer>
          <label htmlFor={priceId}>Price :</label>
          <ErrorContainer errorText={priceError} hasSubmitted={hasSubmitted}>
            <input
              id={priceId}
              type="number"
              step="0.01"
              name="price"
              onChange={onChangeHandler}
              value={internalData.price}
            />
          </ErrorContainer>
          <div className="button-container">
            <button className="ok" type="submit">
              Save
            </button>
            {onDelete ? (
              <button className="warning" type="button" onClick={onDelete}>
                Delete
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default IceCream;
