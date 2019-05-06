import React from "react";

const BlogForm = ({ handleSubmit, newTitle, newAuthor, newUrl }) => {
  /* eslint-disable no-unused-vars */
  let reset, title, author, url;
  ({ reset, ...title } = newTitle);
  ({ reset, ...author } = newAuthor);
  ({ reset, ...url } = newUrl);
  /* eslint-enable no-unused-vars */

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input {...title} />
        </div>
        <div>
          Author:
          <input {...author} />
        </div>
        <div>
          Url:
          <input {...url} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default BlogForm;
