const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const { initial } = require('lodash')
const { title } = require('node:process')
const helper = require('./test_helper')
const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[2])
    await blogObject.save()
})


test('get all the blogs', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    // console.log('response from get all', response.body);
    // console.log('the id of first blog',response.body[0].id)
    assert.strictEqual(response.body.length, helper.initialBlogs.length)

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

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
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

    const blogAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length)
    
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

    const blogAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogAtEnd.length,helper.initialBlogs.length)
})

test('deleting a blog from blogs list', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToDelete = blogAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogAtEnd = await helper.blogsInDb()
    
    assert.strictEqual(blogAtEnd.length, helper.initialBlogs.length -1)

    const ids = blogAtEnd.map(b => b.id)
    assert.ok(!ids.includes(blogToDelete.id))
})

test('updates the likes of a blog',async() => {
    const blogAtStart = await helper.blogsInDb()
    const blogToUpdate = blogAtStart[0]
    const updatedLikes = {...blogToUpdate,likes: blogToUpdate.likes +1}

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const blogAtEnd = await helper.blogsInDb()
    const updatedBlog = blogAtEnd.find(b => b.id === blogToUpdate.id)
    assert.strictEqual(updatedBlog.likes, blogToUpdate.likes +1)
})

after(async () => {
    await mongoose.connection.close()
})

