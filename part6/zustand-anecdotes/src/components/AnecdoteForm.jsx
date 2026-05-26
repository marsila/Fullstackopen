import { useAnecdoteActions } from "../store"

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    await add(content)
    e.target.reset()
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
