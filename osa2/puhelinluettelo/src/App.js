import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import axios from "axios";

const PersonForm = props => {
  return (
    <form onSubmit={props.addName}>
      <div>
        nimi: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        numero:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
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

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterRule, setFilterRule] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  const personsToShow =
    filterRule === ""
      ? persons
      : persons.filter(p => p.name.toLowerCase().includes(filterRule));

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
      setFilterRule(event.target.value);
    } else {
      setFilterRule("");
    }
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
