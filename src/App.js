import React from "react";
import Wrappost from "./components/Wrappost";
import Header from "./components/Header";
import Mainscreen from "./components/Mainscreen";
import { apiapp } from "./API/api";
import "./style/app.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: [],
      token: ""
    };
  }
  componentDidMount() {
    //get the positions for the radio buttons
    apiapp.getPos().then((res) => {
      const positions = res.data.positions;
      this.setState({ positions });
    });
    // get the token that is required to register a new user
    apiapp.getToken().then((res) => {
      const token = res.data.token;
      this.setState({ token });
    });
  }

  render() {
    return (
      <>
        <Header />
        <Mainscreen />
        <Wrappost positions={this.state.positions} token={this.state.token} />
      </>
    );
  }
}

export default App;
