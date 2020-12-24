import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Persons = ({name_obj}) => {
  return (
    <div>
    <p>{name_obj.name}</p>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const changeHandler = (event) => setNewName(event.target.value)

  const submitHandler = (event) => {
    event.preventDefault()
    
    const findDuplicate = persons.filter(nameObject => nameObject.name === newName)
    if (findDuplicate.length !== 0) {
      alert(`${newName} already in phonebook.`)
      return
    }

    const nameObject = {
      name: newName
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={submitHandler} >
        <div>
          name: <input value={newName} onChange={changeHandler}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((name_obj) => 
          <Persons key={name_obj.name} name_obj={name_obj} />
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