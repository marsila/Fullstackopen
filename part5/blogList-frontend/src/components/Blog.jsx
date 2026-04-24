import { useState } from "react";

const Blog = ({ blog, updateBlogLikes }) => {
  const [visible, setVisible] = useState(false);
  const hideDetails = { display: visible ? "none" : "" };
  const showDetails = { display: visible ? "" : "none" };
  const toggleBlogDetails = () => {
    setVisible(!visible);
  };

  const updateLikes = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    console.log("newBlog", newBlog);

    updateBlogLikes(blog.id, newBlog);
  };
  return (
    <>
      <div style={hideDetails} className="blogDetails">
        "{blog.title}" -{blog.author}{" "}
        <button onClick={toggleBlogDetails}>view</button>
      </div>
      <div style={showDetails} className="blogDetails">
        <p>
          {blog.title} <button onClick={toggleBlogDetails}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          {blog.likes} <button onClick={updateLikes}>like</button>
        </p>
        <p>
          {blog.author}
          {blog.user.id}
        </p>
      </div>
    </>
  );
};

export default Blog;
