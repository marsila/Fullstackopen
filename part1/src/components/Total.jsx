export default function Total(props) {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  console.log(total);
  return <p>Number of exercises {total}</p>;
}
