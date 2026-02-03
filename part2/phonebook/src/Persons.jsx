const Persons =({personsToShow, removePerson}) => {
  return(
    <div>
        {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} : {person.number} &nbsp;&nbsp;
          <button onClick={()=>removePerson(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  )
}

export default Persons
