import React from "react";
import PropTypes from "prop-types";
import withRouter from "react-router-dom";

const LoginForm = ({ handleSubmit, username, password }) => {
  /* eslint-disable no-unused-vars */
  let reset, un, pw;
  ({ reset, ...un } = username);
  ({ reset, ...pw } = password);
  /* eslint-enable no-unused-vars */

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input {...un} />
        </div>
        <div>
          password
          <input {...pw} />
        </div>
        <button className="loginButton" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
};

export default LoginForm;
