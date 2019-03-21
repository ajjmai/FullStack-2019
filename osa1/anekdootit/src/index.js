import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Votes = ({ votes }) => {
  return <p>has {votes} votes</p>;
};

const MostVotedAnecdote = props => {
  if (props.votes === 0) {
    return <p>No votes yet</p>;
  }
  return (
    <div>
      {props.anecdotes[props.mostVotesIndex]}
      <Votes votes={props.votes} />
    </div>
  );
};

const App = ({ anecdotes, points }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(0);
  const [mostVotes, setMostVoted] = useState(0);
  const [mostVotesIndex, setMostVotesIndex] = useState(0);

  const nextAnecdote = () => {
    const next = Math.floor(Math.random() * anecdotes.length);
    setSelected(next);
    setVotes(points[next]);
  };

  const voteAnecdote = () => {
    points[selected] += 1;
    setVotes(points[selected]);
    const maxVotes = Math.max(...points);
    const maxVotesIndex = points.indexOf(maxVotes);
    setMostVoted(maxVotes);
    setMostVotesIndex(maxVotesIndex);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <Votes votes={votes} />
      <div>
        <Button handleClick={voteAnecdote} text="vote" />
        <Button handleClick={nextAnecdote} text="next anecdote" />
      </div>
      <h1>Anecdote with most votes</h1>
      <MostVotedAnecdote
        anecdotes={anecdotes}
        votes={mostVotes}
        mostVotesIndex={mostVotesIndex}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const points = new Array(anecdotes.length).fill(0);

ReactDOM.render(
  <App anecdotes={anecdotes} points={points} />,
  document.getElementById("root")
);
