require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test '
    ?process.env.TEST.MONGODB_URI
    :process.env.MONGODB_URI

const SECRET_TOKEN = process.env.SECRET_TOKEN
module.exports = { MONGODB_URI, PORT ,SECRET_TOKEN}