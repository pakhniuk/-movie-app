import * as React from "react";

import { fetchApi } from "../../../api/api";
import { AppContext } from "../../App";
class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      repeatPassword: "",
      isSubmitting: false,
      errors: {
        name: "",
        password: ""
      }
    };
  }

  onChange = ({ target: { name, value } }) => {
    this.setState(prevState => ({
      ...prevState,
      [name]: value,
      errors: {
        ...prevState.errors,
        base: null,
        [name]: null
      }
    }));
  };

  onBlur = ({ target: { name } }) => {
    const errors = this.validationField(name);

    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    }
  };

  validationField = fieldName => {
    const errors = {};
    switch (fieldName) {
      case "name":
        if (this.state.name.length === 0) {
          errors.name = "Not empty";
        }
        return errors;
      case "password":
        if (this.state.password.length === 0) {
          errors.password = "Not empty";
        }
        return errors;
      case "repeatPassword":
        if (this.state.repeatPassword !== this.state.password) {
          errors.repeatPassword = "Must be equal with password field value";
        }
        return errors;
      default:
        return errors;
    }
  };

  validationFields = () => {
    const errors = {};

    if (this.state.name.length === 0) {
      errors.name = "Not empty";
    }

    if (this.state.password.length === 0) {
      errors.password = "Not empty";
    }

    if (this.state.repeatPassword !== this.state.password) {
      errors.repeatPassword = "Must be equal with password field value";
    }

    return errors;
  };

  login = (username = "a.pakhniuk", password = "pakhniukam92") => {
    this.setState({ isSubmitting: true });

    fetchApi("GET", "authentication/token/new")
      .then(data =>
        fetchApi("POST", "authentication/token/validate_with_login", {
          body: {
            username,
            password,
            request_token: data.request_token
          }
        })
      )
      .then(data =>
        fetchApi("POST", "authentication/session/new", {
          body: {
            request_token: data.request_token
          }
        })
      )
      .then(({ session_id }) => {
        this.props.updateSessionId(session_id);
        return fetchApi("GET", "account", { params: { session_id } });
      })
      .then(data => {
        this.props.updateUser(data);
        this.setState({ isSubmitting: false });
      })
      .catch(error => {
        this.setState({
          isSubmitting: false,
          errors: {
            base: error.status_message
          }
        });
      });
  };

  onSubmit = e => {
    e.preventDefault();

    const errors = this.validationFields();

    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    } else {
      this.login(this.state.name, this.state.password);
    }
  };

  render() {
    return (
      <form>
        <legend className="text-center">Login form</legend>
        <div className="form-group">
          <label className="control-label" htmlFor="textinput">
            Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="form-control input-md"
            value={this.state.user}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          {this.state.errors.name && (
            <div className="invalid-feedback">{this.state.errors.name}</div>
          )}
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="textinput">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="form-control input-md"
            value={this.state.password}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          {this.state.errors.password && (
            <div className="invalid-feedback">{this.state.errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <label className="control-label" htmlFor="textinput">
            Repeat Password
          </label>
          <input
            name="repeatPassword"
            type="password"
            placeholder="Repeat Password"
            className="form-control input-md"
            value={this.state.repeatPassword}
            onChange={this.onChange}
            onBlur={this.onBlur}
          />
          {this.state.errors.repeatPassword && (
            <div className="invalid-feedback">
              {this.state.errors.repeatPassword}
            </div>
          )}
        </div>
        <div className="form-group text-center">
          <button
            id="loginBtn"
            className="btn btn-primary"
            disabled={this.state.isSubmitting}
            onClick={this.onSubmit}
          >
            Login
          </button>
          {this.state.errors.base && (
            <div className="invalid-feedback">{this.state.errors.base}</div>
          )}
        </div>
      </form>
    );
  }
}

export default props => (
  <AppContext.Consumer>
    {context => (
      <LoginForm
        updateUser={context.updateUser}
        updateSessionId={context.updateSessionId}
        {...props}
      />
    )}
  </AppContext.Consumer>
);
