const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({name, exercises}) => {
  return (
    <p>
      {name}  {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part => 
        <Part name={part.name} key={part.id} exercises={part.exercises} />
      )}
    </ul>
  )
};

const Total =({parts}) => {
  const total = parts.reduce((sum,part)=> {
    sum += part.exercises;
    return sum
  },0)
  //console.log('total', total)
  return <h3>Total of {total? total: 0} exercises</h3>
}

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </>
  );
};
export default Course;