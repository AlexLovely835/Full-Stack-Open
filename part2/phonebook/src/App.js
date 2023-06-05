import { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonDisplay from './components/PersonDisplay'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPeople => {
      setPersons(initialPeople)
    })
  }, [])
  console.log('rendered', persons.length, 'people')

  const addPerson = (event) => {
    event.preventDefault()
    let check = persons.map(person => person.name).includes(newName)
    if (check) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = persons.filter(person => person.name === newName)
        changePerson(changedPerson[0])
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        createMessage(`Added ${returnedPerson.name}`, 5000)
      })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      personService.deleteObj(id).then(() => {
        createMessage(`Deleted ${name}`, 5000)
        setPersons(persons.filter(person => person.id !== id))
      })
    } 
  }
  
  const changePerson = (cperson) => {
    const changedPerson = {...cperson, number: newNumber}
    personService.updateObj(cperson.id, changedPerson).then(returnedPerson => {
      createMessage(`Updated number for ${returnedPerson.name}`, 5000)
      setPersons(persons.map(person => person.id !== cperson.id ? person : returnedPerson))
    })
    .catch(error => {
      createMessage(`Information for ${cperson.name} has already been deleted from the server`, 5000)
    })
  }
  
  const shownPeople = () => {
    if (newFilter === '') {
      return (persons)
    } else {
      return (persons.filter(person => person.name.toLowerCase().includes(newFilter)))
    }
  }

  const createMessage = (message, time) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, time)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h2>Add Person</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <PersonDisplay people={shownPeople()} handleDelete={deletePerson} />
    </div> 
  )
}

export default App