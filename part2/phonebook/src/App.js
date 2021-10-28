import axios from "axios";
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
    axios
      .post("http://localhost:3001/persons", personObject)
      .then((response) => {
        setPersons(persons.concat(response.data));
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

const Persons = ({ persons, filterText }) => {
  const filteredPersons = persons.filter(
    (person) => person.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
  );
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [filterText, setFilterText] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={filterText} setText={setFilterText}></Filter>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}></PersonForm>
      <h3>Numbers</h3>
      <Persons filterText={filterText} persons={persons}></Persons>
    </div>
  );
};

export default App;
