const blogsRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const logger = require('../utils/logger')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
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

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.author || !body.url) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: 0
  })

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
  logger.info('added new blog ', blog)
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  Blog.findById(request.params.id)
    .then(blog => {
      if (!blog) {
        return response.status(404).end()
      }
      blog.title = body.title;
      blog.author = body.author;
      blog.url = body.url;
      blog.likes = body.likes;
      return blog.save();
    })
    .then(updatedBlog => {
      if (updatedBlog) {
        response.json(updatedBlog)
        logger.info('blog was updated', updatedBlog)
      }
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})



module.exports = blogsRouter
