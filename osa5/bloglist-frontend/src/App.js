import React, { useState, useEffect } from "react";
import User from "./components/User";
import Blog from "./components/Blog";
import UserList from "./components/UserList";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import { useField, useResource } from "./hooks";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

const LoggedIn = ({ user, handleLogout }) => {
  return (
    <span>
      <em>{user.name === null ? user.username : user.name} is logged in</em>
      <button onClick={handleLogout}>Log out</button>
    </span>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  const username = useField("text", "username");
  const password = useField("text", "password");
  const newTitle = useField("text");
  const newAuthor = useField("text");
  const newUrl = useField("text");
  const users = useResource("http://localhost:3003/api/users");

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

  const blogById = id => blogs.find(blog => blog.id === id);

  const userById = id => users.find(user => user.id === id);

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

  const padding = { padding: 5 };

  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">
              blogs
            </Link>
            <Link style={padding} to="/users">
              users
            </Link>
            {user ? (
              <LoggedIn user={user} handleLogout={handleLogout} />
            ) : (
              <p />
            )}
          </div>
          <h1>Bloglist</h1>
          <Notification message={notificationMessage} />
          <ErrorMessage message={errorMessage} />
          <Route
            exact
            path="/"
            render={() =>
              user ? (
                <BlogList
                  blogs={blogs}
                  newTitle={newTitle}
                  newAuthor={newAuthor}
                  newUrl={newUrl}
                  addBlog={addBlog}
                />
              ) : (
                loginForm()
              )
            }
          />
          <Route
            exact
            path="/users"
            render={() => <UserList users={users} />}
          />
          <Route
            path="/blogs/:id"
            render={({ match }) => (
              <Blog
                blog={blogById(match.params.id)}
                likeBlog={likeBlog}
                handleDelete={deleteBlog}
                user={user}
              />
            )}
          />
          <Route
            path="/users/:id"
            render={({ match }) => <User user={userById(match.params.id)} />}
          />
        </div>
      </Router>
    </div>
  );
};

export default App;
