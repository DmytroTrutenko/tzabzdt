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
      defoultUrl:
        "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserChecked = this.handleUserChecked.bind(this);
    this.showMoreUs = this.showMoreUs.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.validatePhoto = this.validatePhoto.bind(this);
  }

  refreshPage(url) {
    apiapp.getUsers(url).then((res) => {
      const users = res.data.users;
      const nextlink = res.data.links.next_url;
      this.setState({ users, nextlink });
      if (nextlink === null) {
        document.getElementById("showMoreUs").style.display = "none";
      }
    });
  }

  componentDidMount() {
    this.refreshPage(this.state.defoultUrl);
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

    apiapp
      .postUser(formData, this.props.token)
      .then(() => {
        this.refreshPage(this.state.defoultUrl);
      })
      .catch((error) => {
        console.log("error" + error);
      });

    this.setState({ name: "", email: "", phone: "", checkedPos: "" });
    document.getElementById("formpost").reset();
  }

  showMoreUs() {
    this.refreshPage(this.state.nextlink);
  }

  validatePhoto() {
    const img = document.getElementById("file").files[0];
    const imgUrl = URL.createObjectURL(img);
    const imgObj = new Image();
    imgObj.src = imgUrl;
    imgObj.onload = () => {
      if (imgObj.width < 70 && imgObj.height < 70) {
        console.log("The photo is small");
        document.getElementById("file").value = "";
        return;
      }
      if (img.size > 5242880) {
        console.log("The photo may not be greater than 5 Mbytes.");
        document.getElementById("file").value = "";
        return;
      }
      if (img.type !== "image/jpeg") {
        console.log("The photo format must be jpeg/jpg type");
        document.getElementById("file").value = "";
        return;
      }
    };
  }

  render() {
    return (
      <section className="request">
        <div className="layout">
          <div className="request_inner">
            <h2>Working with GET request</h2>
            <div className="users d-flex">
              <Wrapget users={this.state.users} />
            </div>
            <button className="btn showMoreUs" id="showMoreUs" onClick={this.showMoreUs}>
              Show more
            </button>

            <h2>Working with POST request</h2>

            <form
              id="formpost"
              className="postRequest"
              onSubmit={this.handleSubmit}
            >
              <div className="form_inner">
                <input
                  className="input_form"
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
                  className="input_form"
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
                  className="input_form"
                  required
                  pattern="^[\+]{0,1}380([0-9]{9})$"
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
                <span>+38(XXX)XXX-XX-XX</span>

                <div className="position">
                  <p>Select your position</p>
                  <ul
                    className="position_inner"
                    name="position"
                    onChange={this.handleUserChecked}
                  >
                    {this.props.positions.map((pos) => (
                      <li key={pos.id}>
                        <input
                          required
                          type="radio"
                          name="position"
                          value={pos.id}
                        />
                        {pos.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="upload d-flex">
                  <label htmlFor="file">Upload</label>
                  <input
                    required
                    type="file"
                    id="file"
                    name="file"
                    accept=".jpg, .jpeg"
                    onChange={this.validatePhoto}
                  />
                  <textarea readOnly placeholder="Upload your photo"></textarea>
                </div>

                <div>
                  <button className="btn" type="submit">Sign up</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Wrappost;
