import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/loginForm";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    const username = loginFormData.username;
    const password = loginFormData.password;
    console.log(username, password);

    try {
      const newUser = await loginService.login({ username, password });
      
      window.localStorage.setItem('loggedUser',JSON.stringify(newUser))
      setUser(newUser);

      setLoginFormData({ username: "", password: "" });
    } catch (error) {
      setErrorMessage("wrong credentials", error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  const handleUserLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

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
        <h3>{user.name} logged in <button onClick={handleUserLogout}>logout</button></h3>
        
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
}

export default App;
