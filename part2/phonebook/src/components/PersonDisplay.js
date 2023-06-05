import Person from './Person.js'

const PersonDisplay = ({ people, handleDelete }) => {
    return(
      <div>
      { people.map(person => <Person key={person.id} person={person} handleDelete={() => handleDelete(person.id, person.name)} />) }
    </div>
    )
  }

export default PersonDisplay