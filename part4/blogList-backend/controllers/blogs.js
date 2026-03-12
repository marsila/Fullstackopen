const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')


blogsRouter.get('/', (request, response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    })
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body
  if (!body.title || !body.author || !body.url) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url:body.url,
    likes:0
  })
  blog.save()
    .then(savedBlog => {
      response.json(savedBlog)
      console.log('added new blog ', blog)
    })
    .catch(error => next(error))
})



blogsRouter.delete('/:id', (request,response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})



module.exports = blogsRouter
