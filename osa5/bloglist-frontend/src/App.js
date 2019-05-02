import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notification message">{message}</div>;
};

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error message">{message}</div>;
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
    //console.log(blogs);
  }, []);

  // store user info to localStorage, no need to log in every time
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // login
  const handleLogin = async event => {
    event.preventDefault();
    try {
      console.log("logging in with", username, password);
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // log out
  const handleLogout = event => {
    event.preventDefault();
    setNotificationMessage(
      `${user.name === null ? user.username : user.name} has logged out`
    );
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
    setUser(null);
    window.localStorage.clear();
  };

  // add new blog to bloglis
  const addBlog = event => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    };

    console.log(blogObject);

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setNotificationMessage(
          `A new blog: ${newTitle} by ${newAuthor} was added`
        );
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch(error => {
        setErrorMessage(`${error.response.data.error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  // delete blog from bloglist
  const deleteBlog = id => {
    const blog = blogs.find(b => b.id === id);
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(id).then(response => {
        setBlogs(blogs.filter(b => b.id !== id));
        setNotificationMessage(
          `Blog ${blog.title} by ${blog.author} was removed from bloglist`
        );
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    }
  };

  const likeBlog = id => {
    const blog = blogs.find(b => b.id === id);
    const liked = { ...blog, likes: blog.likes + 1 };
    console.log(liked.user.username);

    blogService.update(id, liked).then(returnedBlog => {
      setBlogs(blogs.map(b => (b.id !== blog.id ? b : returnedBlog)));
      console.log(returnedBlog.user.username);
    });
    //console.log(user);
  };

  /** 
  const sortByLikes = () => {
    blogs.sort((bA, bB) => {
      return bB.likes - bA.likes;
    });
  };*/

  const loginForm = () => (
    <div>
      <h2>Log in</h2>
      <LoginForm
        username={username}
        password={password}
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </div>
  );

  const blogList = user => (
    <div>
      {user.name === null ? user.username : user.name} is logged in
      <br />
      <br />
      <div>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <h2>Add new blog</h2>
      {blogForm()}
      <h2>Blogs</h2>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          addedBy={blog.user}
          handleDelete={deleteBlog}
          user={user}
          likeBlog={likeBlog}
        />
      ))}
    </div>
  );

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="Add blog">
          <BlogForm
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
            handleNewTitle={({ target }) => setNewTitle(target.value)}
            handleNewAuthor={({ target }) => setNewAuthor(target.value)}
            handleNewUrl={({ target }) => setNewUrl(target.value)}
            handleSubmit={addBlog}
          />
        </Togglable>
      </div>
    );
  };

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification message={notificationMessage} />
      <ErrorMessage message={errorMessage} />
      <div>{user === null ? loginForm() : blogList(user)}</div>
      <div />
    </div>
  );
};

export default App;
