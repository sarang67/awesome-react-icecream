import React from "react";
import PropTypes from "prop-types";

const ErrorContainer = ({ children, errorText, hasSubmitted }) => {
  return (
    <div className="{errrText && hasSubmitted ? 'error' : null}">
      {children}
      <div className="error-wrapper">
        {errorText && hasSubmitted && <span>{errorText}</span>}
      </div>
    </div>
  );
};

export default ErrorContainer;

ErrorContainer.prototype = {
  children: PropTypes.node.isRequired,
  errorText: PropTypes.string,
  hasSubmitted: PropTypes.bool.isRequired,
};
