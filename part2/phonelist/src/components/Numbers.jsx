
const Numbers = ({ persons, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        {
          persons.map(
            person =>
              <p key={person.id}>
                {person.name} {person.number}
                <button onClick={() => handleDelete(person.id)} style={{marginLeft: '10px'}}>delete</button>
              </p>
          )
        }
      </div>
    </div>
  )
}

export default Numbers
