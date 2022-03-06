import React from "react";
import PropTypes from "prop-types";

const IcecreamImage = ({ iceCreamId }) => {
  return iceCreamId ? (
    <img
      src={`/ice-cream-images/ice-cream-${iceCreamId.toString()}.svg`}
      alt=""
    />
  ) : null;
};

IcecreamImage.propTypes = {
  iceCreamId: PropTypes.number,
};

export default IcecreamImage;
