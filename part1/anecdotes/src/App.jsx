import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const handleNextClick = () => {
    const randomNum = Math.floor(Math.random() * anecdotes.length);
    console.log(randomNum);
    setSelected(randomNum);
  };

  const handleVoteClick = () => {
    const votesCopy = { ...votes };
    votesCopy[selected] = (votesCopy[selected] || 0) + 1;
    setVotes(votesCopy);
  };
  //console.log('votes',votes);
  
  const findMax = () => {
    const keys = Object.keys(votes);
    if (keys.length === 0) return 0;
    return keys.reduce((max, current) => {
      const maxVotes= votes[max];
      const currentVotes = votes[current];
      return currentVotes > maxVotes ? current : max;
      
    }, keys[0]);
  };
  const maxVotesIndex = findMax();

  return (
    <>
      <div>
        <h1>The anecdote of the day</h1>
        <h4>{anecdotes[selected]}</h4>
        <h4>has {votes[selected] ? votes[selected] : 0} votes</h4>
        <button onClick={handleVoteClick}>vote</button>
        <button onClick={handleNextClick}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <h4>{anecdotes[maxVotesIndex]}</h4>
        <p>has {votes[maxVotesIndex]? votes[maxVotesIndex]:0} votes</p>
      </div>
    </>
  );
};

export default App;
