const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
}

export default function Content(props) {
  return (
    <>
      <Part part={props.part1} exercises={props.exercises1}/>
      <Part part={props.part2} exercises={props.exercises2}/>
      <Part part={props.part3} exercises={props.exercises3}/>
    </>
  );
}
