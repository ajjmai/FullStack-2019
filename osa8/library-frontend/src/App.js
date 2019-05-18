import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "react-apollo-hooks";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import EditAuthor from "./components/EditAuthor";

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author
      published
    }
  }
`;

const ADD_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: String!
    $genres: [String]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`;

const SET_BIRTHYEAR = gql`
  mutation setBirthYear($name: String!, $born: String) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleError = error => {
    setErrorMessage(error.graphQLErrors[0].message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const result_authors = useQuery(ALL_AUTHORS);
  const result_books = useQuery(ALL_BOOKS);

  const addBook = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  });

  const editAuthor = useMutation(SET_BIRTHYEAR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  });

  return (
    <div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <Authors show={page === "authors"} result={result_authors} />
      <Books show={page === "books"} result={result_books} />
      <NewBook show={page === "add"} addBook={addBook} />
      <EditAuthor show={page === "authors"} editAuthor={editAuthor} />
    </div>
  );
};

export default App;
