import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Addperson from './components/Addperson'
import service from './services/service'
import Notification from './components/Notification'
import './index.css'

const Filter = (props) => {
    return (
        <form>
          <div>
              filter shown with<input value={props.filter}
            onChange={props.handleFilter} /></div>
      </form>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const filteredPersons = () => persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()))
	
	
  useEffect(() => {
	  service
        .getAll()
        .then(initialData => {
           setPersons(initialData)
        })
  }, [])
  
 
  const handleFilter = (event) => setFilter(event.target.value)
  
  const nameChange = (event) => setNewName(event.target.value)

  const numberChange = (event) => setNewNumber(event.target.value)
  
  const addPerson = (event) => {
    event.preventDefault()
	const namelist = persons.map(person => (person.name))
        if (namelist.includes(newName)) {
            if (window.confirm(`${newName}` + ' is already added to phonebook' + '\n' +
                'replace the old number with new one?')) {
                const personToUpdate = persons.find(person => person.name === newName)
                const updatedPerson = { ...personToUpdate, number: newNumber }
                service.update(personToUpdate.id, updatedPerson)
                    .then(response => {
                        showMessage(`Updated number of ${updatedPerson.name}`, true)
                    })
                    .catch(error => {
                        showMessage(`Information of ${newName} has already been removed from server`, false)
                    })
            }
            service.getAll()
                .then(initialData => {
                    setPersons(initialData)
                })
        } else {
            const personObject = {
                name: newName,
                number: newNumber,
                id: persons.length + 1 + Math.random(),
            }
            service
                .create(personObject)
                .then(response => {
                    setPersons(persons.concat(personObject))
                    showMessage(`Added ${personObject.name}`, true)
                })
        }
        setNewName('')
        setNewNumber('')
    }
	
	const handleDeletePerson = id => {
        const selectedPerson = persons.filter(person => person.id === id)
        if (window.confirm(`Really delete ${selectedPerson[0].name}?`)) {
            service.deletePerson(id)
            const remainingPersons = persons.filter(person => person.id !== id)
            setPersons(remainingPersons)
            showMessage(`Deleted ${selectedPerson[0].name}`, true)
        }
    }
  
  
  const showMessage = (newMessage, standard) => {
        if (standard) {
            setMessage(newMessage)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } else {
            setErrorMessage(newMessage)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
   
   

  return (
    <div>
      <h2>Phonebook</h2>
	   <Notification message={message} type={"message"} />
       <Notification message={errorMessage} type={"error"} />
       <Filter filter={filter} handleFilter={handleFilter} />
		<h3>Add a new</h3>
        <Addperson addPerson={addPerson} newName={newName} nameChange={nameChange}
        newNumber={newNumber} numberChange={numberChange} />
		<h3>Numbers</h3>
        <Persons persons={filteredPersons()} filter={filter} handleDeletePerson={handleDeletePerson} />
    </div>
  )

}

export default App;
