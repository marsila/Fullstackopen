import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", phoneNumber:"03-123456" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNewName = (event) => {
    const name = event.target.value;
    setNewName(name);
  };

  const handleNewNumber = (event) => {
    const nameExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    console.log("is there:", nameExists);
    if (nameExists) {
      alert(`${newName} is already added to the phonebook`);
      setNewName("");
    } else {
    const number = event.target.value;
    setNewNumber(number);}
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = { name: newName , phoneNumber: newNumber};
    
      setPersons((prev) => [...prev, personObject]);
      setNewName("");
      setNewNumber("");
  };

  //console.log('phonebook', persons)
  //console.log('name', newName)
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          Name:
          <input
            placeholder="add a name"
            value={newName}
            onChange={handleNewName}
          />
        </div>
        <div>
          Number:
          <input
            placeholder="00-123456"
            value={newNumber}
            onChange={handleNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name} : {person.phoneNumber}</p>
      ))}
    </div>
  );
};

export default App;
