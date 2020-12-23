import React from 'react'
import ReactDOM from 'react-dom'

const Header = () => {
  return (
    <div>
      <h1>Half Stack Application development</h1>
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map((part) =>
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
    <Header />
    <Content course={course} />
    </div>
  )}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'EXTRA COURSE',
        exercises: 21,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

ReactDOM.render(
  <App  />,
  document.getElementById('root')
)