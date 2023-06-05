const Header = (props) => {
    return <h1>{props.course}</h1>
  }
  
  const Total = ({ parts }) => {
    return <p><b>total of { parts.reduce((acc, part) => acc + part.exercises, 0) } exercises</b></p>
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        { parts.map(part => 
          <Part 
            key={part.id} 
            name={part.name} 
            exercises={part.exercises}
          /> 
        )}
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content
          parts = {course.parts} 
        />
        <Total parts = {course.parts} />
      </div>
    )
  }

export default Course