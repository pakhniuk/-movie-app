import * as React from "react";

import Login from "./Login";
import User from "./User";

const Header = ({ user }) => (
  <header className="header">
    <div className="container">
      <a href="/" className="logo">
        Home
      </a>
      {user ? <User /> : <Login />}
    </div>
  </header>
);

export default Header;
