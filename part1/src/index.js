import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PersonForm from './components/PersonsForm'
import PersonsList from './components/PersonsList'

import personService from './services/persons'

const Filter = ({ filter, filterHandler }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={filterHandler} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(existingPersons => setPersons(existingPersons))
  }, [])

  const nameHandler = (event) => setNewName(event.target.value)
  const phoneHandler = (event) => setNewPhone(event.target.value)
  const submitHandler = (event) => {
    event.preventDefault()
    
    if (newName === '' || newPhone === '') {
      alert('Please enter a value for both fields.')
      return
    }

    const findDuplicate = persons.filter(personObject => personObject.name === newName)
    if (findDuplicate.length !== 0) {
      alert(`${newName} already in phonebook.`)
      return
    }

    const generatePersonObject = () => {
      const id = persons.length > 0 
                ? persons[persons.length - 1].id + 1 
                : 1

      const person = {
        name: newName,
        number: newPhone,
        id: id
      }
      return person
    }

    personService
      .addPerson(generatePersonObject())
      .then(responsePerson => {
        setPersons(persons.concat(responsePerson))
        setNewName('')
        setNewPhone('')
      })
  }

  const deleteHandler = ({name, id}) => {
    const selection = window.confirm(`Delete ${name}?`)
    if (selection) {
      personService.deletePerson(id)
      
      const changedPersons = persons.filter((personObject) => personObject.id !== id)
      setPersons(changedPersons)
    }
    else { return }
  }

  const filterHandler = (event) => setFilter(event.target.value)
  const personsToShow = persons.filter((personObject) => personObject.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterHandler={filterHandler} />
      <h3>Add a new person</h3>
      <PersonForm
        submitHandler={submitHandler}
        nameVal={newName} nameHandler={nameHandler}
        phoneVal={newPhone} phoneHandler={phoneHandler}
      />
      <h2>Numbers</h2>
      <PersonsList 
        personsList={personsToShow} 
        deleteHandler={deleteHandler}
      />
    </div>
  )
}

export default App

ReactDOM.render(
  <App />,
  document.getElementById('root')
)