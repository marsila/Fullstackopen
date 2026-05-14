import { create } from "zustand";

const useCounterStore = create(set => ({
    counters:{
        good:0,
        neutral:0,
        bad:0,
    },
    actions:{
        increment : (type)=>set((state) =>({counters:{
            ...state.counters,
            [type]:state.counters[type] +1

        }})),
        reset : () => set({counters :{
            good:0,
            neutral:0,
            bad:0,
        }})
    }
}))
const useCounters = () => useCounterStore(state => state.counters)
const useCountersControls = () => useCounterStore(state => state.actions)
export  {useCounters,useCountersControls}