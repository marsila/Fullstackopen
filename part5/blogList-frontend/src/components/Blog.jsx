import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlogLikes, removeBlog, loggedUser }) => {

  if (!blog) {
    return <div>Loading blog details...</div>
  }

  const updateLikes = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }

    updateBlogLikes(blog.id, newBlog)
  }

  const deleteBlog = () => {
    window.confirm(
      `Are you sure you want to remove the blog "${blog.title}" by "${blog.author}"`,
    ) && removeBlog(blog.id)
  }

  return (
    <>
      <div className="blogDetails">
        <h2>title: {blog.title}</h2>
        <a href={blog.url} target="_blank" rel="noreferrer">url: {blog.url}</a>
        <p>
          likes: {blog.likes} {loggedUser && <button onClick={updateLikes}>like</button>}
        </p>
        <p>author: {blog.author}</p>
        {(blog.user?.username === loggedUser?.username)&&(<button onClick={deleteBlog}>remove</button>)}
      </div>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object.isRequired
}

export default Blog
