import personService from "./server/persons";
import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Person";
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    // const [notice, setNotice] = useState(null);
    // const [noticeType, setNoticeType] = useState("success");
    const [notification, setNotification] = useState(null)


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
    let timeOut = null;
    const showNotification = (type, message) => {
        if (timeOut) clearTimeout(timeOut);
        setNotification({message, type})
        timeOut = setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification data={notification}/>
            <Filter text={filterText} setText={setFilterText}/>
            <h3>add a new</h3>
            <PersonForm
                persons={persons}
                setPersons={setPersons}
                showNotification={showNotification}
            />
            <h3>Numbers</h3>
            <Persons
                filterText={filterText}
                persons={persons}
                onDelete={handleDelete}
            />
    </div>
  );
};

export default App;
