import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredNames, setFilteredNames] = useState("");

  const handleFilteredNames = (event)=>{
    const name =event.target.value;
    console.log('filter', name);
    setFilteredNames(name);    
  }
  const personsToShow = filteredNames === ''
  ? persons
  : persons.filter(person => 
      person.name.toLowerCase().includes(filteredNames.toLowerCase())
    )

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
      const personObject = { name: newName, phoneNumber: newNumber };
      setPersons((prev) => [...prev, personObject]);
      setNewName("");
      setNewNumber("");
    }
  };

  //console.log('phonebook', persons)
  //console.log('name', newName)
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          Filter shown with:
          <input
            value={filteredNames}
            onChange={handleFilteredNames}
          />
        </div>
      </form>
      <h1>Add a new</h1>
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
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} : {person.phoneNumber}
        </p>
      ))}
    </div>
  );
};

export default App;
