import React from "react";
import logo from "../assets/Logo.svg";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="layout">
          <div className="header_inner d-flex">
            <a href="#" className="logo">
              <img src={logo} />
            </a>
            <ul className="header_nav d-flex">
              <li>
                <a href="#" className="btn">Users</a>
              </li>
              <li>
                <a href="#" className="btn">Sign up</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
