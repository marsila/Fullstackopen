import { useCountersControls } from "../store"
const Buttons = () => {
  const {increment , reset} = useCountersControls()
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={()=>increment('good')}>good</button>
      <button onClick={() =>increment('neutral')}>neutral</button>
      <button onClick={() =>increment('bad')}>bad</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

export default Buttons
