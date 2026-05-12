import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const BlogList = ({blogs}) => {

  return(
    <ul>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <li key={blog.id} className='blog'>
            {blog.title} {blog.author}
            <Link to= {`/blogs/${blog.id}`}>view</Link>
          </li>
        ))}
    </ul>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.object.isRequired,
}

export default BlogList
