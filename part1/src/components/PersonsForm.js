import React from 'react'

const TextInput = ({ text, value, handler }) => {
  return (
    <div>
      {text}: <input value={value} onChange={handler} />
    </div>
  )
}
  
const PersonForm = ({ submitHandler, nameVal, nameHandler, phoneVal, phoneHandler }) => {
  return (
    <form onSubmit={submitHandler} >
      <TextInput text="Name" value={nameVal} handler={nameHandler} />
      <TextInput text="Phone" value={phoneVal} handler={phoneHandler} />
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

export default PersonForm