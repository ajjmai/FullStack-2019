import React, { useState } from "react";
import Person from "./components/Person";

const PersonForm = props => {
  return (
    <form onSubmit={props.addName}>
      <div>
        nimi: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        numero:{" "}
        <input nvalue={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );
};

const Filter = props => {
  return (
    <div>
      rajaa näytettäviä <input onChange={props.handleFilter} />
    </div>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(person => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

const App = props => {
  const [persons, setPersons] = useState(props.persons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState(true);

  const personsToShow = showAll
    ? persons
    : [
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Martti Tienari", number: "040-123456" }
      ];

  const addName = event => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
    };

    if (persons.map(person => person.name).includes(newName)) {
      window.alert(`${newName} on jo luettelossa`);
    } else {
      setPersons(persons.concat(nameObject));
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilter = event => {
    if (event.target.value !== "") {
      setShowAll(false);
      console.log(event.target.value);
      filterPersons(event.target.value);
    } else {
      setShowAll(true);
    }
  };

  const filterPersons = rule => {
    persons.filter(p => p.name.toLowerCase().includes(rule));
  };

  return (
    <div>
      <h1>Puhelinluettelo</h1>
      <Filter handleFilter={handleFilter} />
      <h2>lisää uusi</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numerot</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
