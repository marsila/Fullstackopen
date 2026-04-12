const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  if(!user){
    return response.status(401).json({error:'invalid user or token'})
  }


  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
  logger.info('added new blog ', blog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  blog.title = title || blog.title
  blog.author = author || blog.author
  blog.url = url || blog.url
  blog.likes = likes !== undefined ? likes : blog.likes

  const updatedBlog = await blog.save();

  if (updatedBlog) {
    response.json(updatedBlog)
    logger.info('blog was updated', updatedBlog)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    
  const user = request.user

  if(!user){
    return response.status(401).json({error:'invalid user or token'})
  }

  const blog = await Blog.findById(request.params.id)

  if(!blog){
    return response.status(404).json({error:'blog not found!'})
  }

  if(blog.user.toString() !== user.id.toString()){
    return response.status(401).json({error: 'only the creator can delete this blog'})
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})



module.exports = blogsRouter
