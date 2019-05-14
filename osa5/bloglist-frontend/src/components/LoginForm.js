import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";

const LoginForm = ({ handleSubmit, username, password }) => {
  /* eslint-disable no-unused-vars */
  let reset, un, pw;
  ({ reset, ...un } = username);
  ({ reset, ...pw } = password);
  /* eslint-enable no-unused-vars */

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>username</label>
          <input id="username" {...un} />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input id="password" {...pw} />
        </Form.Field>
        <Button
          id="login_button"
          color="violet"
          className="loginButton"
          type="submit"
        >
          Log in
        </Button>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
};

export default LoginForm;
