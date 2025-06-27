
const Course = ({ course }) => {

  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />

      <Total
        total={total}
      />
    </div>
  )
}

export default Course

const Header = (props) => {
  return (
    <h1>{props.title}</h1>
  )
}

const Content = (props) => {
  const parts = props.parts

  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part.name} exercise={part.exercises} />
      )}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}


const Total = ({ total }) => {

  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

