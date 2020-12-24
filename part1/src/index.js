import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Persons = ({personObject}) => {
  return (
    <div>
    <p>{personObject.name} {personObject.number}</p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
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
      <div>
        filter shown with <input value={filter} onChange={filterHandler} />
      </div>
      <h2>Add a new person</h2>
      <form onSubmit={submitHandler} >
        <div>
          name: <input value={newName} onChange={nameHandler}/>
        </div>
        <div>
          phone: <input value={newPhone} onChange={phoneHandler}/>
        </div>
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