import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => <p>{props.text} {props.value}</p>;

const Statistics = (props) => {
  return (
    <div>
      <StatisticLine text={'good'} value={props.good}/>
      <StatisticLine text={'neutral'} value= {props.neutral}/>
      <StatisticLine text={'bad'} value= {props.bad}/>
      <StatisticLine text={'all'} value= {props.all}/>
      <StatisticLine text={'average'} value= {props.average}/>
      <StatisticLine text={'positive'} value= {props.positive}/>
    </div>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = ((good / all) * 100 || 0 )+' %';

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
