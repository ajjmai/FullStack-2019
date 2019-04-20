import React, { useState, useEffect } from "react";
import Person from "./components/Person";
import personService from "./services/persons";
import "./index.css";

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

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notification message">{message}</div>;
};

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error message">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterRule, setFilterRule] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then(initialData => {
      setPersons(initialData);
    });
  }, []);

  const personsToShow =
    filterRule === ""
      ? persons
      : persons.filter(p => p.name.toLowerCase().includes(filterRule));

  // ADD  new person
  const addName = event => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber
    };

    // if person already exists, change number
    if (persons.map(person => person.name).includes(newName)) {
      if (
        window.confirm(
          `${newName} on jo luettelossa, korvataanko vanha numero uudella?`
        )
      ) {
        const person = persons.find(n => n.name === newName);
        const changedNumber = { ...person, number: newNumber };

        personService
          .update(person.id, changedNumber)
          .then(returnedName => {
            setPersons(
              persons.map(p => (p.id !== person.id ? p : returnedName))
            );
            setNotificationMessage(`Muutettiin numero: ${person.name}`);
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
          })
          .catch(error => {
            setErrorMessage(
              `Henkilö ${person.name} oli jo poistettu palvelimelta.`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
            setPersons(persons.filter(p => p.name !== newName));
          });
      }
    } else {
      personService
        .create(nameObject)
        .then(newName => {
          setPersons(persons.concat(newName));
          setNotificationMessage(`Lisättiin ${newName.name}`);
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .catch(error => {
          //console.log(error.response.data);
          setErrorMessage(`${error.response.data.error}`);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  // DELETE person
  const deleteName = id => {
    const person = persons.find(n => n.id === id);
    if (window.confirm(`Poistetaanko ${person.name}?`)) {
      personService.deleteEntry(id).then(response => {
        setPersons(persons.filter(n => n.id !== id));
        setNotificationMessage(`Poistettiin ${person.name}`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
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
      <Notification message={notificationMessage} />
      <ErrorMessage message={errorMessage} />
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
