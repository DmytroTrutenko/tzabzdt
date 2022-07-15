import React from "react";

class User extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.photo}/>
        <p>{this.props.name}</p>
        <p>{this.props.position}</p>
        <p>{this.props.email}</p>
        <p>{this.props.phone}</p>
      </div>
    );
  }
}

export default User;
