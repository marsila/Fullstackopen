import { useEffect, useState } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/loginForm";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [loginForm, setloginForm] = useState({});

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
    setloginForm((prevLoginForm) => ({
      ...prevLoginForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Submited, username = ${loginForm.username} and pass = ${loginForm.password}`,
    );
  };

  return (
    <>
      <LoginForm
        loginForm={loginForm}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <div>
        <h1>Blogs</h1>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
}

export default App;
