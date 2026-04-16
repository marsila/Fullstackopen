const LoginForm = (props) => {
  const  {loginFormData, handleInputChange, handleSubmit} = props
  return (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          username: <input 
                        type="text"
                        name="username"
                        value={loginFormData.username}
                        onChange={handleInputChange} 
                    />
        </label>
        <br />
        <label htmlFor="password">
          password: <input 
                        type="password"
                        name="password"
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
