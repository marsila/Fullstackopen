import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import { useEffect } from "react";
import personsService from "./services/persons";
import Notifications from "./Notifications";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((intialPersons) => setPersons(intialPersons));
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilteredNames] = useState("");

  const handleFilteredNames = (event) => {
    const name = event.target.value;
    setFilteredNames(name);
  };
  const personsToShow =
    filteredNames === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filteredNames.toLowerCase()),
        );

  const handleNewName = (event) => {
    const name = event.target.value;
    setNewName(name);
  };

  const handleNewNumber = (event) => {
    const number = event.target.value;
    setNewNumber(number);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const nameExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    //check if person exists
    if (nameExists) {
      const confirmUpdate = window.confirm(
        `"${newName}" is already added to the phonebook! 
        Do you want to replace the old number with the new one?`,
      );

      //update the number of existing person
      if (confirmUpdate) {
        const updatedPerson = { ...nameExists, number: newNumber };

        personsService
          .update(nameExists.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === nameExists.id ? returnedPerson : person,
              ),
            );
            setMessage({
              text: `${nameExists.name} number was updated`,
              type: "success",
            });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setMessage({
              text: `Information of ${nameExists.name} has already been removed from server`,
              type: "error",
            });
            setPersons(persons.filter((p) => p.id !== nameExists.id));
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
      return;
    }
    // check for empty fields
    if (newName === "" || newNumber === "") {
      alert(`Please fill the empty fields!`);
      return;
    }
    //Add new person
    const personObject = { name: newName, number: newNumber };
    personsService.create(personObject).then((createdPerson) => {
      setPersons((prev) => [...prev, createdPerson]);
      setMessage({ text: `${createdPerson.name} was Added`, type: "success" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setNewName("");
      setNewNumber("");
    });
  };

  const removePerson = (id) => {
    console.log("id", id);
    const toRemove = persons.find((person) => person.id === id);
    window.confirm(
      `Are you sure you want to remove "${toRemove.name}" from your contacts?`,
    ) &&
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setMessage({
            text: `The person '${toRemove.name}' was already deleted from server`,
            type: "error",
          });
          setPersons(persons.filter((p) => p.id !== id));
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={message} />
      <Filter
        filteredNames={filteredNames}
        handleFilteredNames={handleFilteredNames}
      />
      <h1>Add a new</h1>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson} />
    </div>
  );
};

export default App;
