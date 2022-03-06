import { useEffect, useState } from "react";

const useValidators = (value, validatorfn, compareValue = null) => {
  const [error, setError] = useState("");

  useEffect(() => {
    setError(validatorfn(value, compareValue));
  }, [value, validatorfn, compareValue]);

  return error;
};

export default useValidators;
