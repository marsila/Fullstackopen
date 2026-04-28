import { useState } from 'react'
import PropTypes from 'prop-types'

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
Togglable.propTypes = {
  props:PropTypes.object.isRequired,
  children:PropTypes.object.isRequired,
  buttonLabel:PropTypes.object.isRequired,
}
export default Togglable