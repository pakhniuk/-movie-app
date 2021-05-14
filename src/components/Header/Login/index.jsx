import * as React from "react";
import { Modal, ModalBody } from "reactstrap";

import LoginForm from "./loginForm";

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalShown: false
    };
  }

  toggleModal = () => {
    this.setState({ isModalShown: !this.state.isModalShown });
  };

  render() {
    return (
      <div>
        <button
          type="buttom"
          className="btn btn-light"
          onClick={this.toggleModal}
        >
          Login
        </button>
        <Modal isOpen={this.state.isModalShown} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
