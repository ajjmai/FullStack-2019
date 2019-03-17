import React from "react";
import ReactDOM from "react-dom";

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Content = props => {
  return (
    <div>
      <p>
        {props.part1} {props.ex1}{" "}
      </p>
      <p>
        {props.part2} {props.ex2}{" "}
      </p>
      <p>
        {props.part3} {props.ex3}{" "}
      </p>
    </div>
  );
};

const Total = props => {
  return <p>Yhteensä {props.ex1 + props.ex2 + props.ex3} tehtävää</p>;
};

const App = () => {
  const course = "Half Stack -sovelluskehitys";
  const part1 = "Reactin perusteet";
  const exercises1 = 10;
  const part2 = "Tiedonvälitys propseilla";
  const exercises2 = 7;
  const part3 = "Komponenttien tila";
  const exercises3 = 14;

  return (
    <>
      <Header course={course} />
      <Content
        part1={part1}
        ex1={exercises1}
        part2={part2}
        ex2={exercises2}
        part3={part3}
        ex3={exercises3}
      />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
