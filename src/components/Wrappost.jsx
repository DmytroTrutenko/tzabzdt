import React from "react";
import Wrapget from "./Wrapget";
import { apiapp } from "../API/api";

class Wrappost extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      checkedPos: "",
      users: [],
      nextlink: "",
      defoultUrl:"https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChecked = this.handleUserChecked.bind(this);
    this.showMoreUs = this.showMoreUs.bind(this);
  }

  componentDidMount() {
    apiapp.getUsers(this.state.defoultUrl).then((res) => {
      const users = res.data.users;
      const nextlink = res.data.links.next_url;
      this.setState({ users, nextlink });
    });
  }

  handleChange(e) {
    let name = e.target.name,
      email = e.target.email,
      phone = e.target.phone;
    let value = e.target.value;

    this.setState({
      [name]: value,
      [email]: value,
      [phone]: value,
    });
  }

  handleUserChecked(e) {
    this.setState({ checkedPos: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    let fileField = document.querySelector('input[type="file"]');
    formData.append("position_id", this.state.checkedPos);
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("phone", this.state.phone);
    formData.append("photo", fileField.files[0]);

    apiapp.postUser(formData, this.props.token).then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.success) {
        console.log("УОААААА");
      } else {
      }
    })
    .catch(function (error) {});

    apiapp.getUsers(this.state.defoultUrl).then((res) => {
      const users = res.data.users;
      this.setState({ users });
    });
  }

  showMoreUs() {
    apiapp.getUsers(this.state.nextlink).then((res) => {
      const users = res.data.users;
      const nextlink = res.data.links.next_url;
      this.setState({ users, nextlink });

      if (nextlink === null) {
        document.getElementById("showMoreUs").style.display = "none";
      }
    });
  }

  render() {
    return (
      <>
        <Wrapget users={this.state.users} />
        <button id="showMoreUs" onClick={this.showMoreUs}>
          Show more
        </button>

        <h2>Working with POST request</h2>
        <form className="postRequest" onSubmit={this.handleSubmit}>
          <input
            required
            pattern="^[A-Za-zА-Яа-яЁё\s]+$"
            minLength="2"
            maxLength="60"
            type="text"
            name="name"
            placeholder="Your name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <input
            required
            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
            minLength="2"
            maxLength="100"
            type="text"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input
            required
            pattern="^[\+]{0,1}380([0-9]{9})$"
            type="text"
            name="phone"
            placeholder="Phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
          <p>+38(XXX)XXX-XX-XX</p>

          <ul
            required
            className="position"
            name="position"
            onChange={this.handleUserChecked}
          >
            {this.props.positions.map((pos) => (
              <li key={pos.id}>
                <input type="radio" name="position" value={pos.id} />
                {pos.name}
              </li>
            ))}
          </ul>

          <div>
            <label for="file">Upload</label>
            <input
              required
              type="file"
              id="file"
              name="file"
              accept=".jpg, .jpeg"
            />
          </div>

          <div>
            <button type="submit">Sign up</button>
          </div>
        </form>
      </>
    );
  }
}

export default Wrappost;
