import '../index.css'
import PropTypes from 'prop-types'
const Notifications = ({message}) => {
  if(message === null){
    return null
  }
  return (
    <div className={`notification ${message.type}`}>{message.text}</div>
  )
}

Notifications.propTypes ={
  message:PropTypes.object.isRequired
}

export default Notifications