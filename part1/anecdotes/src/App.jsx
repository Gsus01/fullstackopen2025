import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const mostVotedIndex = votes.indexOf(Math.max(...votes))
  const mostVotes = votes[mostVotedIndex]

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  return (
    <div>
      <AnecdoteDisplay anecdotes={anecdotes} selected={selected} votes={votes} />

      <Button onClick={handleVote} text="vote" />
      <Button onClick={() => setSelected(getRandomInt(anecdotes.length))} text="next anecdote" />
      {mostVotes > 0 && (
        <MostVotesAnecdote anecdote={anecdotes[mostVotedIndex]} votes={mostVotes} />
      )}
    </div>
  )
}

export default App

const AnecdoteDisplay = ({ anecdotes, selected, votes }) => {
  console.log(selected)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
    </div>
  )
}

const MostVotesAnecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdote} votes={votes} />
    </div>
  )
}

const Anecdote = ({ text, votes }) => {
  return (
    <div>
      <p>{text}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}