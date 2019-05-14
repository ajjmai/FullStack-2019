import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

const Menu = ({ anecdotes, addNew, anecdoteById }) => {
  const padding = {
    paddingRight: 5
  };
  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">
              anecdotes
            </Link>
            <Link style={padding} to="/create">
              create new
            </Link>
            <Link style={padding} to="/about">
              about
            </Link>
          </div>
          <Route
            exact
            path="/"
            render={() => <AnecdoteList anecdotes={anecdotes} />}
          />
          <Route path="/create" render={() => <CreateNew addNew={addNew} />} />
          <Route path="/about" render={() => <About />} />
          <Route
            path="/anecdotes/:id"
            render={({ match }) => (
              <Anecdote anecdote={anecdoteById(match.params.id)} />
            )}
          />
        </div>
      </Router>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>
      {anecdote.content} by {anecdote.author}
    </h2>
    <div>has {anecdote.votes} votes</div>
    <div>for more info see {anecdote.info}</div>
  </div>
);

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    <br />
    <hr />
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -sovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const Component = props => {
  const { a, b } = props;
  console.log(a, b);
  return <button>press</button>;
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div>{message}</div>;
};

let CreateNew = props => {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    props.addNew({
      content,
      author,
      info,
      votes: 0
    });
    props.history.push("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name="content"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <div>
          author
          <input
            name="author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            value={info}
            onChange={e => setInfo(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

CreateNew = withRouter(CreateNew);

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1"
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2"
    }
  ]);

  const [notification, setNotification] = useState("");

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`a new anecdote ${anecdote.content} created!`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const anecdoteById = id => anecdotes.find(a => a.id === id);

  const vote = id => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Component a={1} b={2} />
      <Notification message={notification} />
      <Menu anecdotes={anecdotes} addNew={addNew} anecdoteById={anecdoteById} />
      <Footer />
    </div>
  );
};

export default App;
