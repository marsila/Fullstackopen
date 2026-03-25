const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initial } = require('lodash')
const { title } = require('node:process')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

test('get all the blogs', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    // console.log('response from get all', response.body);
    // console.log('the id of first blog',response.body[0].id)
    assert.strictEqual(response.body.length, initialBlogs.length)

})

test('the unique identifier property of the blog posts is named id ', async () => {
    const response = await api.get('/api/blogs')

    assert.ok(response.body[0].id)
    assert.strictEqual(response.body[0]._id, undefined)
})

test('new blog added to the list', async () => {
    const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    //console.log('add new blog res',response.body);

    assert.strictEqual(response.body.length, initialBlogs.length + 1)

    const titles = response.body.map(b => b.title)
    assert.ok(titles.includes('Type wars'))
})

test('if likes property is missing, it defaults to 0', async () => {
    const newBlog = {
        title: "Type wars2",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars2.html",
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
})

test('if the title is missing from the request data', async () => {
    const newBlog = {
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars2.html",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length,initialBlogs.length)
    
})

test('if the url is missing from the request data', async () => {
    
    const newBlog = {
        title : "Type Wars",
        author: "Robert C. Martin"       
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length,initialBlogs.length)
})

test('deleting a blog from blogs list', async () => {
    const blogAtStart = await blogsInDb()
    const blogToDelete = blogAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogAtEnd = await blogsInDb()
    
    assert.strictEqual(blogAtEnd.length, initialBlogs.length -1)

    const ids = blogAtEnd.map(b => b.id)
    assert.ok(!ids.includes(blogToDelete.id))
})

after(async () => {
    await mongoose.connection.close()
})

