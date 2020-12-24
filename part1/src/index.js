import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Persons = ({personObject}) => {
  return (
    <div>
    <p>{personObject.name} {personObject.phone}</p>
    </div>
  )
}

const TextInput = ({text, value, handler}) => {
  return (
    <div>
    {text}: <input value={value} onChange={handler}/>
  </div>
  )
}

const Filter = ({filter, filterHandler}) => {
  return (
  <div>
    filter shown with <input value={filter} onChange={filterHandler} />
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [filter, setFilter] = useState('')

  const nameHandler = (event) => setNewName(event.target.value)
  const phoneHandler = (event) => setNewPhone(event.target.value)

  const submitHandler = (event) => {
    event.preventDefault()
    
    const findDuplicate = persons.filter(personObject => personObject.name === newName)
    if (findDuplicate.length !== 0) {
      alert(`${newName} already in phonebook.`)
      return
    }

    const personObject = {
      name: newName,
      phone: newPhone
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone('')
  }

  const filterHandler = (event) => setFilter(event.target.value)
  const personsToShow = persons.filter((personObject) => personObject.name.toUpperCase().includes(filter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} filterHandler={filterHandler} />
      <h3>Add a new person</h3>
      <form onSubmit={submitHandler} >
        <TextInput text="name" value={newName} handler={nameHandler} />
        <TextInput text="phone" value={newPhone} handler={phoneHandler} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map((personObject) => 
          <Persons key={personObject.name} personObject={personObject} />
        )}
      </div>
    </div>
  )
}

export default App

ReactDOM.render(
  <App  />,
  document.getElementById('root')
)