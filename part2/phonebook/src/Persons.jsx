const Persons =({personsToShow}) => {
  return(
    <div>
        {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} : {person.phoneNumber}
        </p>
      ))}
    </div>
  )
}

export default Persons
