import personService from "./server/persons";
import { useEffect, useState } from "react";

const Filter = ({ text, setText }) => {
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  return (
    <p>
      filter shown with <input value={text} onChange={handleTextChange} />
    </p>
  );
};

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const personObject = { name: newName, number: newNumber };
    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filterText, onDelete }) => {
  const filteredPersons = persons.filter(
    (person) => person.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
  );

  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => onDelete(person)}>delete</button>
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const [filterText, setFilterText] = useState("");
  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.deleteById(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={filterText} setText={setFilterText}></Filter>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}></PersonForm>
      <h3>Numbers</h3>
      <Persons
        filterText={filterText}
        persons={persons}
        onDelete={handleDelete}
      ></Persons>
    </div>
  );
};

export default App;
