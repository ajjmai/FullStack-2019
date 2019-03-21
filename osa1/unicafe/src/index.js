import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = props => {
  if (props.total === 0) {
    return <p>Ei yhtään palautetta annettu</p>;
  }
  return (
    <table>
      <tbody>
        <Statistic text="hyvä" value={props.good} />
        <Statistic text="neutraali" value={props.neutral} />
        <Statistic text="huono" value={props.bad} />
        <Statistic text="yhteensä" value={props.total} />
        <Statistic text="keskiarvo" value={props.mean} />
        <Statistic text="positiivisia" value={props.positive} />
      </tbody>
    </table>
  );
};

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };

  const total = good + neutral + bad;
  const mean = (good + bad * -1) / total;
  const positive = ((good / total) * 100).toString(10) + " %";

  return (
    <div>
      <div>
        <h1>Anna palautetta</h1>
        <Button handleClick={handleGood} text="hyvä" />
        <Button handleClick={handleNeutral} text="neutraali" />
        <Button handleClick={handleBad} text="huono" />
      </div>
      <div>
        <h1>Statistiikka</h1>
        <Statistics
          good={good}
          bad={bad}
          neutral={neutral}
          total={total}
          mean={mean}
          positive={positive}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
