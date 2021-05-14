import * as React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { AppContext } from "../App";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          <img
            alt="logo"
            width="40"
            className="rounded-circle"
            src={`http://secure.gravatar.com/avatar/${
              this.props.user.avatar.gravatar.hash
            }`}
          />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.props.deleteUser}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };
}

const UserContainer = props => (
  <AppContext.Consumer>
    {context => (
      <User user={context.user} deleteUser={context.deleteUser} {...props} />
    )}
  </AppContext.Consumer>
);

UserContainer.displayName = "MyComponent";

export default UserContainer;
