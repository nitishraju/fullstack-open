import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Persons = ({personObject}) => {
  return (
    <div>
    <p>{personObject.name} {personObject.phone}</p>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: "123-456-7890" }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((personObject) => 
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