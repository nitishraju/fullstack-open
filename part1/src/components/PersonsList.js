import React from 'react'

const Persons = ({ personObject, deleteHandler }) => {
  return (
    <div>
      {personObject.name} {personObject.number}
      <button 
        type="button" 
        onClick={deleteHandler}>Delete</button>
    </div>
  )
}
  
const PersonsList = ({ personsList, deleteHandler }) => {
  return (
    <div>
      {personsList.map((personObject) =>
        <Persons 
          key={personObject.name} 
          personObject={personObject} 
          deleteHandler={() => deleteHandler(personObject)}
        />
      )}
    </div>
  )
}

export default PersonsList