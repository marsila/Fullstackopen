import { useAnecdotes } from "../store";
import { useAnecdoteActions } from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const { increaseVotes } = useAnecdoteActions();

  const vote = (id) => {
    increaseVotes(id);
  };
  return (
    <>
      {anecdotes
        .toSorted((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
