import { useEffect, useState } from "react";
import propTypes from "prop-types";

const LoaderMessage = ({ loadingMessage, isLoading }) => {
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

  useEffect(() => {
    let loadingMessageDelay;

    if (isLoading) {
      loadingMessageDelay = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 400);
    }

    return () => {
      clearTimeout(loadingMessageDelay);
      setShowLoadingMessage(false);
    };
  }, [isLoading]);

  return (
    <div>
      {showLoadingMessage ? <p className="loading">{loadingMessage}</p> : null}
    </div>
  );
};

LoaderMessage.propTypes = {
  loadingMessage: propTypes.string.isRequired,
  isLoading: propTypes.bool,
};

export default LoaderMessage;
