import React from "react";

class Mainscreen extends React.Component {
  render() {
    return (
      <section className="main-screen">
        <div className="layout">
          <div className="main-screen_inner d-flex">
            <div className="info d-flex">
              <h1>Test assignment for front-end developer</h1>
              <p>
                What defines a good front-end developer is one that has skilled
                knowledge of HTML, CSS, JS with a vast understanding of User
                design thinking as they'll be building web interfaces with
                accessibility in mind. They should also be excited to learn, as
                the world of Front-End Development keeps evolving.
              </p>
              <a href="#formpost" className="btn">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Mainscreen;
