import { useState } from "react";

const Blog = ({blog}) => {
    const [visible, setVisible] = useState(false)
    const hideDetails ={display: visible? 'none': ''}
    const showDetails = {display : visible? '' : 'none'}
    const toggleBlogDetails = () =>{
        setVisible(!visible)        
    }
    return(
        <>
        <div style={hideDetails} className="blogDetails">
            "{blog.title}" -{blog.author} <button onClick={toggleBlogDetails}>view</button>
        </div>
        <div style={showDetails} className="blogDetails">
            <p>{blog.title} <button onClick={toggleBlogDetails}>hide</button></p>
            <p>{blog.url}</p>
            <p>{blog.likes} <button>like</button></p>
            <p>{blog.author}</p>

        </div>
        </>
    )
}

export default Blog