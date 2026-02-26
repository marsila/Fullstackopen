require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const app = express();
const Person = require('./models/person')

app.use(express.json());

app.use(express.static('dist'))

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



app.get('/api/persons', (requests, response) => {
    Person.find({}).then(person => {
        response.json(person);
    })
})

app.get('/', (request, response) => {
    response.send('<h1>PhoneBook App</h1>');
})

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "content missing"
        })
    }
    const person = new Person({
        id: String(Math.floor(Math.random() * 10000)),
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson => {
        response.json(savedPerson)
        console.log('added new person ', person);
    })
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server open on port ${PORT}`);

})