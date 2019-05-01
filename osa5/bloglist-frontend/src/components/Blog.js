import React, { useState } from "react";

const Blog = ({ blog, added }) => {
  const [showBlogInfo, setShowBlogInfo] = useState(false);

  const showWhenVisible = { display: showBlogInfo ? "" : "none" };

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
      <div onClick={toggleVisibility}>
        {blog.title} by {blog.author}
      </div>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>

        <p>
          {blog.likes} likes{" "}
          <button onClick={() => console.log("like")}>like</button>
        </p>
        <p>added by {added}</p>
      </div>
    </div>
  );
};

export default Blog;
