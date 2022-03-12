import React from "react";
import { Link } from "react-router-dom";
import IcecreamImage from "./IceCreamImage";
import PropTypes from "prop-types";

const IceCreamCard = ({ iceCreamId, to, history, heading, children }) => {
  const onItemClickhandler = () => {
    history.push(to);
  };

  const onLinkClickhandler = (event) => {
    event.stopPropagation();
  };

  return (
    <section className="card" onClick={onItemClickhandler}>
      <div className="image-container">
        <IcecreamImage iceCreamId={iceCreamId} />
      </div>
      <div className="text-container">
        <h3>
          <Link to={to} onClick={onLinkClickhandler}>
            {heading}
          </Link>
        </h3>
        {children}
      </div>
    </section>
  );
};

IceCreamCard.propTypes = {
  iceCreamId: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      focus: PropTypes.bool,
    }),
  ]).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  children: PropTypes.node,
};

export default IceCreamCard;
