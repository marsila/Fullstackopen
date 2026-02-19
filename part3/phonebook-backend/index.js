const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT = PORT || 3001;

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.use(express.json());

morgan.token('body', function (req, res) { return JSON.stringify(req.body) });

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
    response.send('<h1>PhoneBook App</h1>');
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const people = persons.length;
    const currentDate = new Date();
    response.send(`
        <p>phonebook has info for ${people} people</p>
        <p>${currentDate}</p>
    `);
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === id);
    person ?
        response.json(person) :
        response.status(404).send('The id was not found! Please try another id')
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(p => p.id !== id);
    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const body = request.body;
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "content missing"
        })
    }
    const nameExist = persons.find(p => p.name === body.name);
    if (nameExist) {
        return response.status(400).json({
            error: "name must be uniqe"
        })
    };

    const person = {
        id: String(Math.floor(Math.random() * 10000)),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person);
    console.log('added new person ', person);

    response.json(person)
})

app.listen(PORT, () => {
    console.log(`server open on port ${PORT}`);

})