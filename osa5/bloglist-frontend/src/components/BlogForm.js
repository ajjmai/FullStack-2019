import React from "react";
import { Form, Button } from "semantic-ui-react";

const BlogForm = ({ handleSubmit, newTitle, newAuthor, newUrl }) => {
  /* eslint-disable no-unused-vars */
  let reset, title, author, url;
  ({ reset, ...title } = newTitle);
  ({ reset, ...author } = newAuthor);
  ({ reset, ...url } = newUrl);
  /* eslint-enable no-unused-vars */

  const margin = { marginTop: 10, marginBottom: 10 };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title:</label>
          <input id="title" {...title} />
        </Form.Field>
        <Form.Field>
          <label>Author:</label>
          <input id="author" {...author} />
        </Form.Field>
        <Form.Field>
          <label>URL:</label>
          <input id="url" {...url} />
        </Form.Field>
        <Button color="violet" style={margin} type="submit">
          save
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
