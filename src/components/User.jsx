import React from "react";

class User extends React.Component {
  render() {
    return (
      <div className="user d-flex">
        <img alt={this.props.name} src={this.props.photo}/>
        <p className="user_name tooltip"  title={this.props.name}>{this.props.name}</p>
        <p>{this.props.position}</p>
        <p className="tooltip"  title={this.props.email}>{this.props.email}</p>
        <p>{this.props.phone}</p>
      </div>
    );
  }
}

export default User;
