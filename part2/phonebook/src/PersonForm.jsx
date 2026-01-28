const PersonForm = ({addPerson,newName,newNumber,handleNewName,handleNewNumber}) => {
  return (
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
  );
};

export default PersonForm;
