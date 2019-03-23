import React from "react";
import ReactDOM from "react-dom";
import Course from "./components/Course";

const Total = props => {
  return (
    <p>
      Yhteensä{" "}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}{" "}
      tehtävää
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack -sovelluskehitys",
    parts: [
      {
        name: "Reactin perusteet",
        exercises: 10,
        id: 1
      },
      {
        name: "Tiedonvälitys propseilla",
        exercises: 7,
        id: 2
      },
      {
        name: "Komponenttien tila",
        exercises: 14,
        id: 3
      }
    ]
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
