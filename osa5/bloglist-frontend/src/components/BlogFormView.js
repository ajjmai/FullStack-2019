import React from "react";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const BlogFormView = ({ newTitle, newAuthor, newUrl, addBlog }) => {
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

export default BlogFormView;
