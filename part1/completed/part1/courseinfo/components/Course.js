import React from 'react'

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Content = ({ course }) => {
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

const Course = ({ courses }) => {
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
  )
}

export default Course