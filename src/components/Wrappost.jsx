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

  //updating received users with API
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
  //When the page is rendered, update the users
  componentDidMount() {
    this.refreshPage(this.state.defoultUrl);
  }
  //Get the data from the form and push it into the state
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
  //Get the checked position and push it into the state
  handleUserChecked(e) {
    this.setState({ checkedPos: e.target.value });
  }
  //Create an object from the form data and send a post request
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
    //Clean the form
    this.setState({ name: "", email: "", phone: "", checkedPos: "" });
    document.getElementById("formpost").reset();
  }
  //get users with the API from the next page
  showMoreUs() {
    this.refreshPage(this.state.nextlink);
  }

  //check the uploaded picture and display an error message
  validatePhoto() {
    const img = document.getElementById("file").files[0];
    const fileNameField = document.getElementById("file-name");
    const errorSpan = document.getElementById("error_text");
    const upload = document.getElementById("upload");
    const label = document.getElementById("label");
    let valueForm = document.getElementById("file").value;

    fileNameField.placeholder = img.name;

    const imgUrl = URL.createObjectURL(img);
    const imgObj = new Image();
    imgObj.src = imgUrl;
    imgObj.onload = () => {
      errorSpan.classList.remove("error");
      upload.classList.remove("error");
      errorSpan.textContent = "";
      if (imgObj.width < 70 && imgObj.height < 70) {
        upload.classList.add("error");
        errorSpan.classList.add("error");
        errorSpan.textContent = "The photo is small";
        valueForm = "";
        return;
      }
      if (img.size > 5242880) {
        upload.classList.add("error");
        errorSpan.classList.add("error");
        errorSpan.textContent = "The photo may not be greater than 5 Mbytes.";
        valueForm = "";
        return;
      }
      if (img.type !== "image/jpeg") {
        upload.classList.add("error");
        errorSpan.classList.add("error");
        errorSpan.textContent = "The photo format must be jpeg/jpg type";
        valueForm = "";
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
            <div id="users" className="users d-flex">
              <Wrapget users={this.state.users} />
            </div>
            <button
              className="btn showMoreUs"
              id="showMoreUs"
              onClick={this.showMoreUs}
            >
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
                        <label>
                          <input
                            required
                            type="radio"
                            name="position"
                            value={pos.id}
                          />
                          {pos.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div id="upload" className="upload d-flex">
                  <input
                    required
                    type="file"
                    id="file"
                    name="file"
                    onChange={this.validatePhoto}
                  />
                  <label id="label" htmlFor="file">
                    Upload
                  </label>
                  <input
                    readOnly
                    id="file-name"
                    placeholder="Upload your photo"
                    className="choisefile"
                  ></input>
                </div>
                <span id="error_text" className="error_text"></span>

                <div>
                  <button className="btn" type="submit">
                    Sign up
                  </button>
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
