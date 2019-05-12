import React from "react";
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";

const UserList = ({ users }) => {
  const textColor = {
    color: "#551a8b"
  };

  return (
    <div>
      <h2>Users</h2>
      <Table color="violet" striped celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>user</Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`} style={textColor}>
                  {user.name}
                </Link>
              </Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default UserList;
