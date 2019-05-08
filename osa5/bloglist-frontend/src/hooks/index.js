import { useState, useEffect } from "react";
import axios from "axios";

export const useField = ({ type, name }) => {
  const [value, setValue] = useState("");

  const onChange = event => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return { type, value, onChange, reset, name };
};

export const useResource = baseUrl => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setResources(response.data);
    });
  }, []);

  return resources;
};
