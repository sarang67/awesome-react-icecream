import React from "react";
import PropTypes from "prop-types";

const IcecreamImage = ({ iceCreamId }) => {
  return (
    <img
      src={`ice-cream-images/ice-cream-${iceCreamId.toString()}.svg`}
      alt=""
    />
  );
};

IcecreamImage.propTypes = {
  iceCreamId: PropTypes.number.isRequired,
};

export default IcecreamImage;
