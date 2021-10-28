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

export default Persons;
