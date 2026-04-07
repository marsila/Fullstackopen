const mongoose = require('mongoose')


const url = process.env.MONGODB_URI

console.log('Connecting to url...', url)

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('Connected successfully!')
  })
  .catch(err => {
    console.error('Connection error:', err.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(\d{2,3}-\d+)$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    minLength: 8,
    required: true
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)