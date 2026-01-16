const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
}

export default function Content(props) {
  const {part1,part2,part3} = props
  return (
    <>
      <Part part={part1.name} exercises={part1.exercises}/>
      <Part part={part2.name} exercises={part2.exercises}/>
      <Part part={part3.name} exercises={part3.exercises}/>
    </>
  );
}
