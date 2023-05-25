import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.var}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, all }) => {
  let avg = 0
  let pos = 0

  if(all === 0) {
    avg = 0
    pos = 0
  } else {
    avg = (good-bad)/all
    pos = (good/all) * 100
  }

  if(all === 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <table>
        <StatisticLine text="good" var={good} />
        <StatisticLine text="neutral" var={neutral} />
        <StatisticLine text="bad" var={bad} />
        <StatisticLine text="all" var={all} />
        <StatisticLine text="average" var={avg} />
        <StatisticLine text="positive" var={pos + '%'} />
      </table>
    )
  }

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  

  const handleGoodClick = () => {
    console.log("Good changed from", good)
    setGood(good + 1)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    console.log("Neutral changed from", neutral)
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    console.log("Bad changed from", bad)
    setBad(bad + 1)
    setAll(all + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

export default App