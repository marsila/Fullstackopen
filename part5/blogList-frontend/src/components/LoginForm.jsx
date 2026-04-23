import { useState } from "react";
const LoginForm = ({loginSubmit}) => {
  const [loginFormData, setLoginFormData] = useState({
      username: "",
      password: "",
    });
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setLoginFormData((prevLoginForm) => ({
        ...prevLoginForm,
        [name]: value,
      }));
    };

  const handleSubmit = (e) => {
      e.preventDefault();
      loginSubmit(loginFormData)
      setLoginFormData({ username: "", password: "" });
    };
  return (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          username: <input 
                        type="text"
                        name="username"
                        id="username"
                        value={loginFormData.username}
                        onChange={handleInputChange} 
                    />
        </label>
        <br />
        <label htmlFor="password">
          password: <input 
                        type="password"
                        name="password"
                        id="password"
                        value={loginFormData.password}
                        onChange={handleInputChange} 
                    />
        </label>
        <br />
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default LoginForm;
