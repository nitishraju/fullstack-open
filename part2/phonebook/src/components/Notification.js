import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
  return null
  }
  
  let msgColor = null
  if (['Added', 'Deleted', 'Updated'].includes(message.split(':')[0])) {
    msgColor = 'green'
  }
  else {
    msgColor = 'red'
  }
  
  const notifStyle = {
    color: msgColor,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  return (
  <div className="error" style={notifStyle}>
    {message}
  </div>
  )
}

export default Notification 