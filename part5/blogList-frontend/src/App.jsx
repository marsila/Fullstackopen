import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/loginForm";
import CreateBlog from "./components/CreatBlog";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState(() => {
    const loggeduUserJSON = window.localStorage.getItem("loggedUser");
    if (loggeduUserJSON) {
      const user = JSON.parse(loggeduUserJSON);
      blogService.setToken(user.token);
      return user;
    }
    return null;
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAll();
        setBlogs(response);
      } catch (error) {
        console.error("Somthing went wrong", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevLoginForm) => ({
      ...prevLoginForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await loginService.login(loginFormData);

      window.localStorage.setItem("loggedUser", JSON.stringify(newUser));

      blogService.setToken(newUser.token);
      setUser(newUser);
      setLoginFormData({ username: "", password: "" });
    } catch (error) {
      setErrorMessage("wrong credentials", error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleUserLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleNewBlogInput = (e) => {
    //console.log('user here', user);

    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const createNewBlog = async (e) => {
    e.preventDefault();
    try {
      const newBlog = await blogService.creatBlog(blog);
      setBlogs(blogs.concat(newBlog));
      setBlog({ title: "", author: "", url: "" });
    } catch (error) {
      setErrorMessage("Somthing went wrong!", error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  if (user === null)
    return (
      <LoginForm
        loginFormData={loginFormData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    );
  return (
    <>
      <h1>Blogs</h1>
      <div>
        <h3>
          {user.name} logged in{" "}
          <button onClick={handleUserLogout}>logout</button>
        </h3>
        <CreateBlog
          blog={blog}
          handleNewBlogInput={handleNewBlogInput}
          createNewBlog={createNewBlog}
        />
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
}

export default App;
