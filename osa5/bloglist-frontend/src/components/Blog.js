import React from "react";
import { Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Blog = ({ blog, handleDelete, user, likeBlog }) => {
  if (blog === undefined || user === null) {
    return <Redirect to="/" />;
  }

  const showDeleteButton = {
    display: user.username === blog.user.username ? "" : "none"
  };

  const likes = blog.likes;

  return (
    <div>
      <h2 className="button blogtitle">
        {blog.title} by {blog.author}
      </h2>
      <div className="togglableContent">
        <a href={blog.url}>{blog.url}</a>
        <br />
        <br />
        <Button
          color="red"
          content="like"
          icon="heart"
          label={{
            basic: true,
            color: "red",
            pointing: "left",
            content: likes
          }}
          onClick={() => likeBlog(blog.id)}
        />
        <br />
        <br />
        <p>added by {blog.user.name}</p>

        <Button
          color="violet"
          style={showDeleteButton}
          onClick={() => handleDelete(blog.id)}
        >
          delete
        </Button>
      </div>
    </div>
  );
};

export default Blog;
