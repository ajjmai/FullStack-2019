import React, { useState } from "react";

const EditAuthor = ({ show, result, editAuthor }) => {
  const [name, setName] = useState("");
  const [born, setBirthYear] = useState("");

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const submit = async e => {
    e.preventDefault();

    await editAuthor({
      variables: { name, born }
    });

    setName("");
    setBirthYear("");
  };

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <select value={name} onChange={({ target }) => setName(target.value)}>
            <option value="" disabled>
              choose
            </option>
            {authors.map(a => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">Update author info</button>
      </form>
    </div>
  );
};

export default EditAuthor;
