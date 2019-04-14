import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import personService from "./services/persons";

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

const Filter = ({ handleFilter }) => {
  return (
    <div>
      rajaa näytettäviä <input onChange={handleFilter} />
    </div>
  );
};

const Persons = ({ persons, deleteName }) => {
  return (
    <div>
      {persons.map(person => (
        <Person key={person.id} person={person} deleteName={deleteName} />
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
    personService.getAll().then(initialData => {
      setPersons(initialData);
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
      const person = persons.find(n => n.name === newName);
      const id = person.id;
      const changedNumber = { ...person, number: newNumber };

      if (
        window.confirm(
          `${person.name} on jo luettelossa, korvataanko vanha numero uudella?`
        )
      ) {
        personService.update(id, changedNumber).then(returnedName => {
          setPersons(persons.map(p => (p.name !== newName ? p : returnedName)));
        });
      }
      //window.alert(`${newName} on jo luettelossa`);
    } else {
      personService.create(nameObject).then(newName => {
        setPersons(persons.concat(newName));
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const deleteName = id => {
    const person = persons.find(n => n.id === id);
    if (window.confirm(`Poistetaanko ${person.name}?`)) {
      personService
        .deleteEntry(id)
        .then(setPersons(persons.filter(n => n.id !== id)));
    }
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
      <Persons persons={personsToShow} deleteName={deleteName} />
    </div>
  );
};

export default App;
