import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};
function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const avarage = (good - bad)/all || 0;
  const positive = (good/all)*100 || 0;

  const handleGoodClick = () => {
    console.log("good clicked");
    setGood((prev) => prev + 1);
  };

  const handleNeutralClick = () => {
    console.log("neutral clicked");
    setNeutral((prev) => prev + 1);
  };

  const handleBadClick = () => {
    console.log("bad clicked");
    setBad((prev) => prev + 1);
  };

  return (
    <>
      <h1>Give feedback</h1>
      <Button text={"good"} handleClick={handleGoodClick} />
      <Button text={"neutral"} handleClick={handleNeutralClick} />
      <Button text={"bad"} handleClick={handleBadClick} />
      <div>
        <h1>Statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {avarage}</p>
        <p>positive {positive} %</p>
      </div>
    </>
  );
}

export default App;
