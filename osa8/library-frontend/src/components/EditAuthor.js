import React, { useState } from "react";

const EditAuthor = props => {
  const [name, setName] = useState("");
  const [born, setBirthYear] = useState("");

  const submit = async e => {
    e.preventDefault();

    await props.editAuthor({
      variables: { name, born }
    });

    setName("");
    setBirthYear("");
  };

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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
