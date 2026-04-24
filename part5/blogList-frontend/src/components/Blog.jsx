import { useState } from "react";

const Blog = ({ blog, updateBlogLikes, removeBlog, loggedUser }) => {
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
      user: blog.user.id
    };

    updateBlogLikes(blog.id, newBlog);
  };

  const deleteBlog = () => {
    window.confirm(
      `Are you sure you want to remove the blog "${blog.title}" by "${blog.author}"`,
    ) && removeBlog(blog.id);
  };

  return (
    <>
      <div style={hideDetails} className="blogDetails">
        "{blog.title}" -{blog.author}{" "}
        <button onClick={toggleBlogDetails}>view</button>
      </div>
      <div style={showDetails} className="blogDetails">
        <p>
          title: {blog.title} <button onClick={toggleBlogDetails}>hide</button>
        </p>
        <p>url: {blog.url}</p>
        <p>
          likes: {blog.likes} <button onClick={updateLikes}>like</button>
        </p>
        <p>author: {blog.author}</p>
        {(blog.user?.username === loggedUser)&&(<button onClick={deleteBlog}>remove</button>)}
      </div>
    </>
  );
};

export default Blog;
