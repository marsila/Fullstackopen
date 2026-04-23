import { useState } from "react"

const Togglable = (props) =>{
    const [visible, setVisible] = useState(false)
    const showForm = {display: visible ? '':'none'}
    const hideForm = {display: visible ? 'none' : ''}
    const toggleVisibility = ()=> {
        setVisible(!visible)
    }
    return(
        <>
        <div style={hideForm}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showForm}>
            {props.children}
            <button onClick={toggleVisibility}>cancle</button>
        </div>
        </>
    )
}

export default Togglable