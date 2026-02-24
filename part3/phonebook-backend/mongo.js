const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://marsilaa_fullstack:${password}@cluster0.irbjvfs.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

console.log('Connecting to MongoDB...');

mongoose.set('strictQuery', false);

mongoose.connect(url, { family: 4 })
.then(() => {
    console.log('Connected successfully!');    
})
.catch(err => {
    console.error('Connection error:', err.message)
  })


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//     name: 'Arto Hellas',
//     number: '040-123456',
// })

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('People in your phonebook app:');
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`);
        })
        mongoose.connection.close();
    })
} else if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];
    const person = new Person({ name, number });
    person.save().then(result => {
        console.log(`Added ${name} ${number} to the phonebook App`)
        mongoose.connection.close()
    })
}

///// tests ////
/*
// node mongo.js <password> Anna 040-1234556
// node mongo.js <password> "Ada Lovelace" 040-1231236
// node mongo.js <password>
*/

