const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initial } = require('lodash')

const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
})

test('get all the blogs', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200) 
        .expect('Content-Type', /application\/json/) 

   // console.log('response from get all', response.body);
   // console.log('the id of first blog',response.body[0].id)
    assert.strictEqual(response.body.length, initialBlogs.length)

})

test('the unique identifier property of the blog posts is named id ', async() => {
    const response = await api.get('/api/blogs')
    
    assert.ok(response.body[0].id)
    assert.strictEqual(response.body[0]._id,undefined)    
})

after(async () => {
    await mongoose.connection.close()
})