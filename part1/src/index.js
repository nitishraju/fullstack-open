import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, clickHandler}) => (
  <button onClick={clickHandler}>
    {text}
  </button>
)

const Stat = ({text, count}) => <p>{text} {count}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text="good" clickHandler={incrementGood} />
        <Button text="neutral" clickHandler={incrementNeutral} />
        <Button text="bad" clickHandler={incrementBad} />
      </div>
      <h1>statistics</h1>
      <div>
        <Stat text="good" count={good} />
        <Stat text="neutral" count={neutral} />
        <Stat text="bad" count={bad} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))