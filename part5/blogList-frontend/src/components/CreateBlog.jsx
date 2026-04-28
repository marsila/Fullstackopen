import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlog = ({ createNewBlog }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleNewBlogInput = (e) => {
    const { name, value } = e.target
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }))
  }

  const addNewBlog =(e) => {
    e.preventDefault()
    createNewBlog(blog)
    setBlog({ title: '', author: '', url: '' })
  }
  return (
    <div>
      <form onSubmit={addNewBlog}>
        <label htmlFor="title">
          Title:{' '}
          <input
            type="text"
            name="title"
            value={blog.title}
            id="title"
            onChange={handleNewBlogInput}
          />
        </label>
        <br />
        <label htmlFor="author">
          Author:{' '}
          <input
            type="text"
            name="author"
            value={blog.author}
            id="author"
            onChange={handleNewBlogInput}
          />
        </label>
        <br />
        <label htmlFor="author">
          URL:{' '}
          <input
            type="text"
            name="url"
            value={blog.url}
            id="url"
            onChange={handleNewBlogInput}
          />
        </label>
        <br />
        <button>submit</button>
      </form>
    </div>
  )
}
CreateBlog.propTypes = {
  createNewBlog: PropTypes.fbunc.isRequired
}

export default CreateBlog
