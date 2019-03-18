import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Content = props => {
  return (
    <div>
      <Part part={props.part1} />
      <Part part={props.part2} />
      <Part part={props.part3} />
    </div>
  );
};

const Part = props => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Total = props => {
  return <p>Yhteensä {props.ex1 + props.ex2 + props.ex3} tehtävää</p>;
};

const App = () => {
  const course = "Half Stack -sovelluskehitys";
  const part1 = {
    name: "Reactin perusteet",
    exercises: 10
  };
  const part2 = {
    name: "Tiedonvälitys propseilla",
    exercises: 7
  };
  const part3 = {
    name: "Komponenttien tila",
    exercises: 14
  };

  return (
    <>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total
        ex1={part1.exercises}
        ex2={part2.exercises}
        ex3={part3.exercises}
      />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
