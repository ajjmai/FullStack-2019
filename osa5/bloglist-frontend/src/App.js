import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { useField } from "./hooks";

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
  //const [newTitle, setNewTitle] = useState("");
  //const [newAuthor, setNewAuthor] = useState("");
  //const [newUrl, setNewUrl] = useState("");
  //const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const username = useField("text", "username");
  const password = useField("text", "password");
  const newTitle = useField("text");
  const newAuthor = useField("text");
  const newUrl = useField("text");

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
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
      console.log("logging in with", username.value, password.value);
      const user = await loginService.login({
        username: username.value,
        password: password.value
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
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
      title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value,
      likes: 0
    };

    console.log(blogObject);

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog));
        setNotificationMessage(
          `A new blog: ${newTitle.value} by ${newAuthor.value} was added`
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

    newTitle.reset();
    newAuthor.reset();
    newUrl.reset();
  };

  // delete blog from bloglist
  const deleteBlog = id => {
    const blog = blogs.find(b => b.id === id);
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      blogService.deleteBlog(id).then(() => {
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
    const user = blog.user;
    const liked = { ...blog, likes: blog.likes + 1 };

    blogService.update(id, liked).then(returnedBlog => {
      const updatedBlog = { ...returnedBlog, user: user };
      setBlogs(
        sortByLikes(blogs.map(b => (b.id !== blog.id ? b : updatedBlog)))
      );
    });
  };

  const sortByLikes = notSortedBlogs => {
    const sortedBlogs = notSortedBlogs.sort((bA, bB) => {
      return bB.likes - bA.likes;
    });
    return sortedBlogs;
  };

  const loginForm = () => (
    <div>
      <h2>Log in</h2>
      <LoginForm
        username={username}
        password={password}
        handleSubmit={handleLogin}
      />
    </div>
  );

  const blogList = user => (
    <div className="blogList">
      {user.name === null ? user.username : user.name} is logged in
      <br />
      <br />
      <div>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <h2>Add new blog</h2>
      {blogForm()}
      <h2 className="blogs">Blogs</h2>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
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
    </div>
  );
};

export default App;
