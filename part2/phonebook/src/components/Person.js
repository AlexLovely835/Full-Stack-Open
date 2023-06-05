const Person = ({person, handleDelete}) => (
    <p id={person.id}>{ person.name } {person.number} <button onClick={handleDelete}>Delete</button></p>
  )

export default Person