import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      console.log("logging in with", username, password);
      const user = await loginService.login({ username, password });

      setUser(user);
      setName(user.name === null ? username : user.name);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );

  const blogList = user => (
    <div>
      <h2>Blogs</h2>
      {name} is logged in
      <br />
      <br />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <div>{user === null ? loginForm() : blogList({ user })}</div>
    </div>
  );
};

export default App;
