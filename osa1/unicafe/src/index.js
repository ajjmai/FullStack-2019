import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
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

  const total = good + bad * -1;
  const mean = total / (good + neutral + bad);
  const positive = ((good / (good + neutral + bad)) * 100).toString(10) + " %";

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
        <Statistics text={"hyvä"} value={good} />
        <Statistics text={"neutraali"} value={neutral} />
        <Statistics text={"huono"} value={bad} />
        <Statistics text={"yhteensä"} value={total} />
        <Statistics text={"keskiarvo"} value={mean} />
        <Statistics text={"positiivisia"} value={positive} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
