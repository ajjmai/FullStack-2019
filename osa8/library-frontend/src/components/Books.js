import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const Books = ({ result, show }) => {
  if (!show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }
  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
