import React from "react";

class User extends React.Component {
  render() {
    return (
      <div className="user d-flex">
        <img src={this.props.photo}/>
        <p className="user_name">{this.props.name}</p>
        <p>{this.props.position}</p>
        <p>{this.props.email}</p>
        <p>{this.props.phone}</p>
      </div>
    );
  }
}

export default User;
