export default function Total(props){
    const total = props.exercises.reduce((sum,exercise) => sum + exercise,0)
    return(
        <p>Number of exercises {total}</p>
    )
}