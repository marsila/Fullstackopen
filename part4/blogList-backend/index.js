require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')


const app = express();
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, { family: 4 })

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

const PORT = process.env.PORT || 3003
app.listen(PORT,()=> {console.log(`The server is open on the port ${PORT}`);
})