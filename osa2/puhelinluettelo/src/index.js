import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const persons = [
  { name: "Arto Hellas", number: "040-123456" },
  { name: "Martti Tienari", number: "040-123456" },
  { name: "Arto Järvinen", number: "040-123456" },
  { name: "Lea Kutvonen", number: "040-123456" }
];

ReactDOM.render(<App persons={persons} />, document.getElementById("root"));
