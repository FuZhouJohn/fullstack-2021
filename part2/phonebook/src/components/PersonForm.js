import { useState } from "react";
import personService from "../server/persons";

const PersonForm = ({ persons, setPersons, showNotification }) => {
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
    const existedPerson = persons.find((person) => person.name === newName);

    if (
      existedPerson &&
      window.confirm(
        `${existedPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personService
        .update(existedPerson.id, {
          ...existedPerson,
          number: newNumber,
        })
        .then((returnedPerson) => {
          showNotification("success", `Updated ${returnedPerson.name}`);
          setPersons(
            persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            )
          );
          setNewName("");
          setNewNumber("");
        })
        .catch((errorMessage) => {
          showNotification("error", errorMessage);
        });
      return;
    }

    const personObject = { name: newName, number: newNumber };
    personService
      .create(personObject)
      .then((returnedPerson) => {
        showNotification("success", `Added ${returnedPerson.name}`);
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      })
      .catch((errorMessage) => {
        showNotification("error", errorMessage);
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

export default PersonForm;
