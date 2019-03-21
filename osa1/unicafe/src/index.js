import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

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
  const positive = (good / (good + neutral + bad)) * 100;

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
        <p>hyvä {good}</p>
        <p>neutraali {neutral}</p>
        <p>huono {bad}</p>
        <p>yhteensä {total}</p>
        <p>keskiarvo {mean}</p>
        <p>positiivisia {positive} %</p>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
