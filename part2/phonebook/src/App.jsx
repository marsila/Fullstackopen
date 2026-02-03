import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import { useEffect } from "react";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

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

    if (nameExists) {
      const confirmUpdate = window.confirm(
        `"${newName}" is already added to the phonebook! 
        Do you want to replace the old number with the new one?`,
      );
      if (confirmUpdate) {
        const updatedPerson = { ...nameExists, number: newNumber };
        console.log("update", nameExists.id);
        personsService
          .update(nameExists.id, updatedPerson)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id === nameExists.id ? returnedPerson : person,
              ),
            ),
          )
          .catch((error) => alert(`Somthing went wrong ${error}`));
      }
    }
    if (newName === "" || newNumber === "") {
      alert(`Please fill the empty fields!`);
    } else {
      const personObject = { name: newName, number: newNumber };
      personsService.create(personObject).then((createdPerson) => {
        setPersons((prev) => [...prev, createdPerson]);
        setNewName("");
        setNewNumber("");
      });
    }
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
        .catch((error) => alert(`Couldn't delete the contact:${error}`));
  };

  return (
    <div>
      <h2>Phonebook</h2>
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
