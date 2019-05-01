import React from "react";

const BlogForm = ({
  handleSubmit,
  handleNewTitle,
  handleNewAuthor,
  handleNewUrl,
  newTitle,
  newAuthor,
  newUrl
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input value={newTitle} onChange={handleNewTitle} />
        </div>
        <div>
          Author:
          <input value={newAuthor} onChange={handleNewAuthor} />
        </div>
        <div>
          Url:
          <input value={newUrl} onChange={handleNewUrl} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
