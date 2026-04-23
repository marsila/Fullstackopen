import { useState } from "react"

const Togglable = (props) =>{
    const [visible, setVisible] = useState(false)
    const hideForm = {display: visible ? '':'none'}
    const showForm = {display: visible ? 'none' : ''}
    const toggleVisibility = ()=> {
        setVisible(!visible)
    }
    return(
        <>
        <div style={showForm}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={hideForm}>
            {props.children}
            <button onClick={toggleVisibility}>cancle</button>
        </div>
        </>
    )
}

export default Togglable