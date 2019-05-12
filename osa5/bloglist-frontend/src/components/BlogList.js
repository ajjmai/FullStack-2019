import React from "react";
import BlogFormView from "./BlogFormView";
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";

const BlogList = ({ blogs, newTitle, newAuthor, newUrl, addBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };
  const textColor = {
    color: "#551a8b"
  };

  return (
    <div className="blogList">
      <h3 className="blogs">Add new blog</h3>
      <BlogFormView
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
        addBlog={addBlog}
      />
      <div>
        <h2 className="blogs">Blogs</h2>
        <Table color="violet" striped celled>
          <Table.Body>
            {blogs.map(blog => (
              <Table.Row key={blog.id} style={blogStyle}>
                <Table.Cell>
                  <Link to={`/blogs/${blog.id}`} style={textColor}>
                    {blog.title} by {blog.author}
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default BlogList;
