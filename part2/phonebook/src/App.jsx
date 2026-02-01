import { useState } from "react";
import axios from "axios";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import { useEffect } from "react";

const App = () => {

  const [persons, setPersons] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        console.log('promise fulfilled')
        const persons = response.data;
        console.log("Persons", persons);
        setPersons(persons)
      });
  }, []);
  
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilteredNames] = useState("");

  const handleFilteredNames = (event) => {
    const name = event.target.value;
    //console.log("filter", name);
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
    console.log("is there:", nameExists);
    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      if (newName === "" || newNumber === "") {
        alert(`Please fill the empty fields!`);
      } else {
        const personObject = { name: newName, number: newNumber };
        setPersons((prev) => [...prev, personObject]);
        setNewName("");
        setNewNumber("");
      }
    }
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
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
