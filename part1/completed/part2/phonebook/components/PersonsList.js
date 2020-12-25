import React from 'react'

const Persons = ({ personObject }) => {
  return (
    <div>
      <p>{personObject.name} {personObject.number}</p>
    </div>
  )
}
  
const PersonsList = ({ personsList }) => {
  return (
    <div>
      {personsList.map((personObject) =>
        <Persons key={personObject.name} personObject={personObject} />
      )}
    </div>
  )
}

export default PersonsList