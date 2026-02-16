const express = require('express');
const app = express();
const PORT = 3001;

let persons =[
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

app.get('/',(request,response)=>{
    response.send('<h1>PhoneBook App</h1>');
})

app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/info',(request, response)=> {
    const people= persons.length;
    const currentDate=  new Date();
    response.send(`
        <p>phonebook has info for ${people} people</p>
        <p>${currentDate}</p>
    `);
    console.log('date',date);
})

app.get('/api/persons/:id',(request,response)=>{
    const id = request.params.id;
    const person = persons.find(person => person.id === id);
    person?
        response.json(person) :
        response.status(404).send('The id was not found! Please try another id')
})

app.listen(PORT, ()=> {
    console.log(`server open on port ${PORT}`);
    
})