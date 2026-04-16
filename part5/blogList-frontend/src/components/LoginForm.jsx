const LoginForm = (props) => {
  const  {LoginForm, handleInputChange, handleSubmit} = props
  return (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          username: <input 
                        type="text"
                        name="username"
                        value={LoginForm.username}
                        onChange={handleInputChange} 
                    />
        </label>
        <br />
        <label htmlFor="password">
          password: <input 
                        type="text"
                        name="password"
                        value={LoginForm.password}
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
