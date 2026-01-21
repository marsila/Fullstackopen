import { useState } from "react";

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={props.good} />
        <StatisticLine text={"neutral"} value={props.neutral} />
        <StatisticLine text={"bad"} value={props.bad} />
        <StatisticLine text={"all"} value={props.all} />
        <StatisticLine text={"average"} value={props.average} />
        <StatisticLine text={"positive"} value={props.positive} />
      </tbody>
    </table>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = all===0 ? 0 : ((good - bad) / all).toFixed(1);
  const positive = all ===0 ? 0 : (((good / all) * 100).toFixed(1)) + " %";

  const handleGoodClick = () => setGood((prev) => prev + 1);

  const handleNeutralClick = () => setNeutral((prev) => prev + 1);

  const handleBadClick = () => setBad((prev) => prev + 1);

  return (
    <>
      <h1>Give feedback</h1>
      <Button text={"good"} handleClick={handleGoodClick} />
      <Button text={"neutral"} handleClick={handleNeutralClick} />
      <Button text={"bad"} handleClick={handleBadClick} />
      <h1>Statistics</h1>
      {all == 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
        />
      )}
    </>
  );
}

export default App;
