import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/loginForm";
import CreateBlog from "./components/CreatBlog";
import Notifications from "./components/Notifications";

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

  const [messageForUser, setMessageForUser] = useState(null);
  //Helper function to extract error messages and Notifications
  const notify = (text, type) => {
    setMessageForUser({text,type})
    setTimeout(()=> setMessageForUser(null),5000)
  }

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
      } catch {
        notify( `Somthing went wrong! Can't show the blogs`,"error")
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
    } catch{
      notify(` wrong credentials! please check the user name and password and try again`,"error")
    }
  };

  const handleUserLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleNewBlogInput = (e) => {
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
      notify(`a new blog was created: ${newBlog.title}, by ${newBlog.author}`,"success")
    } catch {
      notify(`new blog wasn't created, some fields are missing!`,"error")
    }
  };
  return (
    <>
      <Notifications message={messageForUser} />
      {user === null ? (
        <LoginForm
          loginFormData={loginFormData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      ) : (
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
      )}
    </>
  );
}

export default App;
