const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const Blog = require('./models/blog')

const app = express();

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})


app.get('/',(req,res)=>{
    res.send('<h1>The Blog List</h1>')
})


app.listen(config.PORT,()=> {logger.info(`The server is open on the port ${config.PORT}`);
})