import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import { Link } from "react-router-dom";

import "./ContactInfo.css";

export default class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: false,
      phone: false,
      emailDisabled: false,
      phoneDisabled: false,
    };
    this.emailClicked = this.emailClicked.bind(this);
    this.phoneClicked = this.phoneClicked.bind(this);
  }

  emailClicked() {
    this.setState({ email: true });
    console.log(this.state);
    this.setState({ emailDisabled: true });
  }

  phoneClicked() {
    this.setState({ phone: true });
    console.log(this.state);
    this.setState({ phoneDisabled: true });
  }

  send() {
    this.props.setEmail(this.state.email);
    this.props.setPhone(this.state.phone);
  }

  render() {
    return (
      <div className="contact">
        <div className="contact-box">
          <p className="chef-headline">Cum vrei sa fii contactat?</p>

          <div className="contact-btns">
            <button
              className="contact-btn"
              onClick={this.emailClicked}
              disabled={this.state.emailDisabled}
            >
              <p className="chef-header">Email</p>
            </button>

            <button
              className="contact-btn"
              onClick={this.phoneClicked}
              disabled={this.state.phoneDisabled}
            >
              <p className="chef-header">Telefon</p>
            </button>
          </div>
          <Link to="ads" className="landing-btn-next" onClick={this.send}>
            Mai Departe
          </Link>
        </div>
      </div>
    );
  }
}
