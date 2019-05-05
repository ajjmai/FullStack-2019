import React, { useState } from "react";

const Blog = ({ blog, handleDelete, user, likeBlog }) => {
  const [showBlogInfo, setShowBlogInfo] = useState(false);

  const showWhenVisible = { display: showBlogInfo ? "" : "none" };
  const showDeleteButton = {
    display: user.username === blog.user.username ? "" : "none"
  };

  const toggleVisibility = () => {
    setShowBlogInfo(!showBlogInfo);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility} className="button blogtitle">
        {blog.title} by {blog.author}
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <a href={blog.url}>{blog.url}</a>

        <p>
          {blog.likes} likes{" "}
          <button onClick={() => likeBlog(blog.id)}>like</button>
        </p>
        <p>added by {blog.user.name}</p>

        <button style={showDeleteButton} onClick={() => handleDelete(blog.id)}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
