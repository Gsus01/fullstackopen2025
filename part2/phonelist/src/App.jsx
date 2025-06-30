import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import phoneService from './services/phoneService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState({ message: null, type: null })

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
      .catch(error => {
        alert('Error fetching data')
        console.error(error)
      })
  }, [])
  
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )


  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.find(obj => obj.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        phoneService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNotification({ message: `Updated ${returnedPerson.name}'s number`, type: 'success' })
            setTimeout(() => setNotification({ message: null, type: null }), 4000)
            setNewName("")
            setNewNumber("")
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              setNotification({ message: `Information of ${existingPerson.name} has already been removed from server`, type: 'error' })
              setPersons(persons.filter(p => p.id !== existingPerson.id))
            } else {
              setNotification({ message: 'Error updating person', type: 'error' })
            }
            setTimeout(() => setNotification({ message: null, type: null }), 4000)
            console.error(error)
          })
      }
    } else {
      phoneService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNotification({ message: `Added ${response.name}`, type: 'success' })
          setTimeout(() => setNotification({ message: null, type: null }), 4000)
          setNewName("")
          setNewNumber("")
        })
        .catch(error => {
          setNotification({ message: 'Error adding person', type: 'error' })
          setTimeout(() => setNotification({ message: null, type: null }), 4000)
          console.error(error)
        })
    }
  }


  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (person && window.confirm(`Are you sure you want to delete ${person.name}?`)) {
      phoneService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotification({ message: 'Person deleted', type: 'success' })
          setTimeout(() => setNotification({ message: null, type: null }), 4000)
        })
        .catch(error => {
          setNotification({ message: 'Error deleting person', type: 'error' })
          setTimeout(() => setNotification({ message: null, type: null }), 4000)
          console.error(error)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Numbers persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App