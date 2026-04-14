import { useEffect, useState } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"

function App() {

  const [blogs, setBlogs] = useState([])

  useEffect(()=>{
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAll()
        console.log('the response from server', response);        
        setBlogs(response)
      } catch (error) {
        console.error('Somthing went wrong', error)
      }
    }
    fetchBlogs()
  },[])

  return (
    <>
      <h1>Blogs</h1>
      {blogs.map(blog => 
        <Blog key ={blog.id} blog= {blog}/>
      )}
    </>
  )
}

export default App
