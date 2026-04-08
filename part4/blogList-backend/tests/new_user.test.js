const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const helper = require('./test_helper')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')


describe('New user', () => {

    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash("secretPass",10)
        const user = new User({username:"admin", name:"root user", password:passwordHash}) 
        await user.save()
    })
    test('fails with 400 if username is already taken ', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            "username": "admin",
            "name": "root user",
            "password": "1234"
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const uersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes(`expected 'username' to be unique`))
        assert.strictEqual(uersAtEnd.length, usersAtStart.length)

    })

    test('fails with 400 if the password has less than 3 characters', async()=>{
        const usersAtStart = await helper.usersInDb()
        const newUser ={
            username:"member1",
            name:"member 1",
            password: "12"
        }
        const result = await api
                                .post('/api/users')
                                .send(newUser)
                                .expect(400)
                                .expect('Content-Type',/application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes(`password must be at least 3 characters long`))
        assert.strictEqual(usersAtEnd.length,usersAtStart.length)

    })
    test('fails when the username is too short', async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username : "ab",
            name : "ab",
            password : "1234" 
        }

        const result = await api
                                .post('/api/users')
                                .send(newUser)
                                .expect(400)
                                .expect('Content-Type',/application\/json/)

        assert(result.body.error.includes('is shorter than the minimum allowed length'))
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length,usersAtStart.length)
    })

    test('the hashed password is not visible in the response', async () => {
        const newUser ={
            username:"passwordCheck",
            name : "password check",
            password : "validPass"
        }

        const result = await api
                                .post('/api/users')
                                .send(newUser)
                                .expect(201)
                                .expect('Content-Type',/application\/json/)
        
        assert.strictEqual(result.body.hasOwnProperty('passwordHash'),false)
        assert.ok(result.body.id)
    })
})

after(async () => {
    await mongoose.connection.close()
})