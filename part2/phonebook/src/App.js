import personService from "./server/persons";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Person";

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
