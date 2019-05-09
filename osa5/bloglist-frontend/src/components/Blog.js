import React from "react";

const Blog = ({ blog, handleDelete, user, likeBlog }) => {
  if (blog === undefined || user === null) {
    return null;
  }

  const showDeleteButton = {
    display: user.username === blog.user.username ? "" : "none"
  };

  return (
    <div>
      <h2 className="button blogtitle">
        {blog.title} by {blog.author}
      </h2>
      <div className="togglableContent">
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
