import React from "react";
import User from "./User";

class Wrapget extends React.Component {
  render() {
    return (
      <>
        <div>
          {this.props.users.map((u) => (
            <User
              key={u.id}
              name={u.name}
              email={u.email}
              phone={u.phone}
              photo={u.photo}
              position={u.position}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Wrapget;
