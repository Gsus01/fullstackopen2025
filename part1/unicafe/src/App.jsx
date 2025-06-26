import { useState } from 'react'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={() => setGood(good => good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral => neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad => bad + 1)} text="bad" />
      <Header text="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  const average = (good - bad) / all
  const positive = (good / all) * 100

  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average.toFixed(1)}</p>
      <p>positive {positive.toFixed(1)} %</p>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)