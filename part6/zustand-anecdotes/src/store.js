
import { create } from 'zustand'
import anecdotes from './srvices/anecdotes'
import anecdotesService from  './srvices/anecdotes'


const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter :'',
  actions: {
    increaseVotes : id => set(
      state => ({
        anecdotes : state.anecdotes.map(
          anecdote => anecdote.id === id ? {...anecdote, votes : anecdote.votes +1} : anecdote
        )
      })
    ),
    add : anecdote => set(
      state => ({
        anecdotes : [...state.anecdotes , anecdote]
      })
    ),
    setFilter: value => set(() => ({ filter: value })),
    initialize : async () => {
      const anecdotes = await anecdotesService.getAll()
      set({anecdotes})},
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()) )
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
