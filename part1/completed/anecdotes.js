import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voteCounts, setVotes] = useState(props.anecdotes.map((x) => 0))
  const [mostVotes, setMostVotes] = useState(-1)

  const incrementVote = (selected) => () => {
    const copy = [...voteCounts]
    copy[selected] += 1
    setVotes(copy)

    checkHighestVotes(copy[selected])
  }

  const checkHighestVotes = (currentVotes) => {
    if (mostVotes === -1 || currentVotes > voteCounts[mostVotes]) {
      setMostVotes(selected)
    }
  }

  const setRandomIndex = () => setSelected(Math.floor(Math.random()*props.anecdotes.length))

  if (mostVotes === -1) {
    return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {voteCounts[selected]} votes</p>
      <Button text="vote" clickHandler={incrementVote(selected)} />
      <Button text="next anecdote" clickHandler={setRandomIndex} />
      <h1>Anecdote with most votes</h1>
      <p>No votes yet!</p>
    </div>
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {voteCounts[selected]} votes</p>
      <Button text="vote" clickHandler={incrementVote(selected)} />
      <Button text="next anecdote" clickHandler={setRandomIndex} />
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[mostVotes]}</p>
      <p>has {voteCounts[mostVotes]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)