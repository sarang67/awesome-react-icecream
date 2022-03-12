import React, { useEffect, useState } from "react";
import LoaderMessage from "../structure/LoaderMessage";
import { Helmet } from "react-helmet";
import { getICeCreams } from "../data/iceCreamData";
import IceCreamCard from "./IceCreamCard";
import IceCreamCardContainer from "./IceCreamCardContainer";

const IceCreams = ({ history }) => {
  const [iceCreams, setIceCreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getICeCreams().then((iceCreams) => {
      if (isMounted) {
        setIceCreams(iceCreams);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  console.log(iceCreams);
  return (
    <main>
      <Helmet>
        <title>
          Choose Your Awesome ice cream from stock| Awesome ice cream
        </title>
      </Helmet>

      <h2 className="main-heading">Choose Your Awesome ice cream from stock</h2>
      <LoaderMessage
        loadingMessage="Loading the stocks ice creams"
        isLoading={isLoading}
      />
      {iceCreams.length > 0 ? (
        <IceCreamCardContainer>
          {iceCreams.map(({ id, name }) => (
            <IceCreamCard
              key={id.toString()}
              iceCreamId={id}
              heading={name}
              to={{
                pathname: "/menu-items/add",
                search: `?iceCreamId=${id.toString()}`,
              }}
              history={history}
            />
          ))}
        </IceCreamCardContainer>
      ) : (
        !isLoading && (
          <p className="fully-stocked">Your menu is fully stocked!</p>
        )
      )}
    </main>
  );
};

export default IceCreams;
