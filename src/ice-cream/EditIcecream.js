import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { deleteMenuItem, getMenuItem, putMenuItem } from "../data/iceCreamData";
import LoaderMessage from "../structure/LoaderMessage";

import "../styles/forms-spacer.css";

import IceCream from "./IceCream";

const EditIceCream = ({ match, history }) => {
  const [menuItem, setMenuItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getMenuItem(match.params.menuItemId)
      .then((item) => {
        if (isMounted.current) {
          setMenuItem(item);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 404 && isMounted.current) {
          history.replace("/");
        }
      });
  }, [match.params.menuItemId, history]);

  const onSubmitHandler = (updatedItem) => {
    putMenuItem({ id: menuItem.id, ...updatedItem }).then(() => {
      history.push("/");
    });
  };

  const onDeleteHandler = () => {
    deleteMenuItem(match.params.menuItemId).then((data) => {
      console.log(data);
      history.replace("/");
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
      <LoaderMessage
        loadingMessage="Loading ice cream."
        isLoading={isLoading}
      />

      {!isLoading && (
        <IceCream
          {...menuItem}
          onDelete={onDeleteHandler}
          onSubmit={onSubmitHandler}
        />
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
