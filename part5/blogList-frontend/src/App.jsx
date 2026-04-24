import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/loginForm";
import CreateBlog from "./components/CreateBlog";
import Notifications from "./components/Notifications";
import Togglable from "./components/Togglable";

function App() {
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(() => {
    const loggeduUserJSON = window.localStorage.getItem("loggedUser");
    if (loggeduUserJSON) {
      const user = JSON.parse(loggeduUserJSON);
      blogService.setToken(user.token);
      return user;
    }
    return null;
  });

  const [messageForUser, setMessageForUser] = useState(null);
  //Helper function to extract error messages and notifications
  const notify = (text, type) => {
    setMessageForUser({ text, type });
    setTimeout(() => setMessageForUser(null), 5000);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAll();
        setBlogs(response);
      } catch {
        notify(`Somthing went wrong! Can't show the blogs`, "error");
      }
    };
    fetchBlogs();
  }, []);

  const handleSubmit = async (loginObject) => {
    try {
      const newUser = await loginService.login(loginObject);

      window.localStorage.setItem("loggedUser", JSON.stringify(newUser));

      blogService.setToken(newUser.token);
      setUser(newUser);
    } catch {
      notify(
        ` wrong credentials! please check the user name and password and try again`,
        "error",
      );
    }
  };

  const handleUserLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const createNewBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.creatBlog(blogObject);
      setBlogs(blogs.concat(newBlog));

      notify(
        `a new blog was created: ${newBlog.title}, by ${newBlog.author}`,
        "success",
      );
    } catch {
      notify(`new blog wasn't created, some fields are missing!`, "error");
    }
  };

  const updateBlogLikes = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.updateBlogLikes(id, blogObject);

      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog.id !== id ? blog : updatedBlog)),
      );

      notify(`The blog likes was updated!`, "success");
    } catch (error) {
      const status = error.response?.status;

      if (status === 401 || status === 500) {
        notify("your session has expiered, please login again", "error");
        handleUserLogout();
      } else {
        notify(`Couldn't update the likes of the blog!`, "error");
      }
    }
  };

  const removeBlog = async (id) => {
    const blogToDelete = blogs.find((blog) => blog.id === id);
    try {
      if (!blogToDelete) {
        return notify("Somthing went wrong, please try agin later", "error");
      }
      await blogService.deleteBlog(id);
      setBlogs((blogs) => blogs.filter((b) => b.id !== id));
      notify("The blog was removed!", "success");
    } catch (error) {
      const status = error.response?.status;
      if (status === 401) {
        notify(
          `Only "${blogToDelete.user.username}" can delete this Blog`,
          "error",
        );
      } else if (status === 404) {
        notify("The blog is already removed!", "error");
      }
    }
  };
  return (
    <>
      <Notifications message={messageForUser} />
      {user === null ? (
        <LoginForm loginSubmit={handleSubmit} />
      ) : (
        <>
          <h1>Blogs</h1>
          <div>
            <h3>
              {user.name} logged in{" "}
              <button onClick={handleUserLogout}>logout</button>
            </h3>
            <Togglable buttonLabel="create new blog">
              <CreateBlog createNewBlog={createNewBlog} />
            </Togglable>
            {blogs
              .toSorted((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlogLikes={updateBlogLikes}
                  removeBlog={removeBlog}
                  loggedUser={user.username}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default App;
