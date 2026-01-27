import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewName = (event) => {
    const name = event.target.value;
    setNewName(name);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName };
    const nameExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    console.log("is there:", nameExists);
    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
    } else {
      setPersons((prev) => [...prev, personObject]);
      setNewName("");
    }
  };

  //console.log('phonebook', persons)
  //console.log('name', newName)
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name:{" "}
          <input
            placeholder="add a name"
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
