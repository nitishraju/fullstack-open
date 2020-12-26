import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonsForm'
import PersonsList from './components/PersonsList'
import Notification from './components/Notification'

import personService from './services/persons'

const Filter = ({ filter, filterHandler }) => {
  return (
    <div>
      Search: <input value={filter} onChange={filterHandler} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [notifMsg, setNotifMsg] = useState(null)

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
  
  const generatePersonObject = (givenId) => {
    let id = null;
    if (givenId !== undefined) {
      id = givenId
    }
    else {
      id = persons.length > 0 
        ? persons[persons.length - 1].id + 1 
        : 1
    }

    const person = {
      name: newName,
      number: newPhone,
      id: id
    }
    return person
  }

  const findDuplicate = persons.filter(personObject => personObject.name === newName)
  if (findDuplicate.length !== 0) {
    const selection = window.confirm(`${newName} already in phonebook. Replace old number with given number?`)
    if (selection) {
      const existingPerson = persons.filter((personObject) => personObject.name === newName)
      const updatedPerson = generatePersonObject(existingPerson[0].id)

      personService
        .updatePerson(updatedPerson)
        .then(() => {
          const newPersons = persons.map((personObject) => personObject.name === updatedPerson.name ? updatedPerson : personObject)
          setPersons(newPersons)

          const message = `Updated ${existingPerson[0].name}`
          setNotifMsg(message)
          setTimeout(() => setNotifMsg(null), 5000)
        })
        .catch(() => {
          const message = `The information for ${existingPerson[0].name} has already been deleted.`
          setNotifMsg(message)
          setTimeout(() => setNotifMsg(null), 5000)

          setPersons(persons.filter((personObject) => personObject.name !== existingPerson[0].name))
        })
      return
    }
    else { return }
  }

  personService
    .addPerson(generatePersonObject())
    .then(responsePerson => {
      setPersons(persons.concat(responsePerson))
      setNewName('')
      setNewPhone('')

      const message = `Added ${responsePerson.name}`
      setNotifMsg(message)
      setTimeout(() => setNotifMsg(null), 5000)
    })
  }

  const deleteHandler = ({name, id}) => {
    const selection = window.confirm(`Delete ${name}?`)
    if (selection) {
      personService.deletePerson(id)
        .then(() => {
          const message = `Deleted ${name}`
          setNotifMsg(message)
          setTimeout(() => setNotifMsg(null), 5000)
        })
        .catch(err => {
          alert(`${name} has already been deleted from the server.`)
          setPersons(persons.filter((personObject) => personObject.name !== name))
        })

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
      <Notification message={notifMsg} />
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