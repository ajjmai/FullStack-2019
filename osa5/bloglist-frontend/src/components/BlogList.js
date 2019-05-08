import React from "react";
import BlogFormView from "./BlogFormView";
import { Link } from "react-router-dom";

const BlogList = ({ blogs, newTitle, newAuthor, newUrl, addBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div className="blogList">
      <h2 className="blogs">Blogs</h2>
      <BlogFormView
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
        addBlog={addBlog}
      />
      <div>
        {blogs.map(blog => (
          <p key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
