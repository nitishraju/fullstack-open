import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
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
  const reducer = (accumulator, parts_obj) => {
    return accumulator + parts_obj.exercises
  }
  const total = course.parts.length > 0 ? course.parts.reduce(reducer, 0) : 0

  return (
    <div>
      {course.parts.map((part) =>
        <Part key={part.id} part={part} />
      )}
      <p><strong>Total of {total} exercises</strong></p>
    </div>
  )
}

const Course = ({courses}) => {
  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.name}>
          <Header key={course.name} course={course} />
          <Content key={course.id} course={course} />
          </div>
        )
      })}
    </div>
  )}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

ReactDOM.render(
  <App  />,
  document.getElementById('root')
)