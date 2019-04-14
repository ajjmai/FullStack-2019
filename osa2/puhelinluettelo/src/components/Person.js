import React from "react";

const Person = ({ person, deleteName }) => {
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={() => deleteName(person.id)}>poista</button>
    </div>
  );
};

export default Person;
