import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, clickHandler}) => (
  <button onClick={clickHandler}>
    {text}
  </button>
)

const Stat = ({text, value}) => <p>{text} {value}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  const getTotal = () => good + neutral + bad
  const getPositivePct = () => isNaN(good/getTotal()) ? "N/A" : (good/getTotal())*100 + "%"
  const getAvg = () => (getTotal() === 0) ? 0 : (good-bad)/getTotal()

  if (getTotal() === 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <div>
          <Button text="good" clickHandler={incrementGood} />
          <Button text="neutral" clickHandler={incrementNeutral} />
          <Button text="bad" clickHandler={incrementBad} />
        </div>
        <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
        </div>
      </div>
    )
  }

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
        <Stat text="good" value={good} />
        <Stat text="neutral" value={neutral} />
        <Stat text="bad" value={bad} />
        <Stat text="all" value={getTotal()} />
        <Stat text="average" value={getAvg()} />
        <Stat text="positive" value={getPositivePct()} />
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))