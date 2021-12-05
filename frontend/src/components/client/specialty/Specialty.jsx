import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";

import "./Specialty.css";
import JobButton from "../jobButton/JobButton";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

export default class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false, //Set render state to false
      specialties: [
        "asistent bucatar",
        "sef bucatar",
        "spalator",
        "patiser",
        "cofetar",
        "patiser",
        "cofetar",
        "spalator",
        "patiser",
        "cofetar",
        "asistent bucatar",
        "sef bucatar",
        "patiser",
        "cofetar",
        "spalator",
        "asistent bucatar",
        "sef bucatar",
        "cofetar",
        "asistent bucatar",
        "sef bucatar",
        "patiser",
        "cofetar",
        "spalator",
        "asistent bucatar",
        "sef bucatar",
      ],
      shownSpecialties: [],
      sentSpecialties: [],
      showNum: 5,
    };
    this.incShow = this.incShow.bind(this);
    this.addSpecialty = this.addSpecialty.bind(this);
    this.addAllSpecialties = this.addAllSpecialties.bind(this);
    this.send = this.send.bind(this);
  }

  incShow(spesh) {
    let { showNum } = this.state;
    this.setState({ showNum: showNum + 5 });
    console.log(this.state.showNum);
  }

  addSpecialty(spesh) {
    const speshs = [...this.state.sentSpecialties, spesh];
    this.setState({ sentSpecialties: speshs });
    this.props.changeSpecialties(this.state.sentSpecialties);
  }

  addAllSpecialties(job) {
    this.setState({ sentSpecialties: this.state.shownSpecialties });
    this.props.changeSpecialties(this.state.sentSpecialties);
  }

  send() {
    this.props.changeSpecialties(this.state.sentSpecialties);
  }

  componentDid;

  render() {
    return (
      <div className="spesh">
        <div className="spesh-box">
          <div className="job-title">
            <p className="spesh-header">Care sunt specialitatile tale?</p>
            <div className="job-btns">
              {this.state.specialties
                .slice(0, this.state.showNum)
                .map((spesh, index) => (
                  <JobButton
                    title={spesh}
                    key={index}
                    handleClick={this.addSpecialty}
                  />
                ))}
              <JobButton title="orice" handleClick={this.addAllSpecialties} />
              <JobButton title="+ mai multe" handleClick={this.incShow} />
            </div>
          </div>

          <Link to="contact" className="landing-btn-next" onClick={this.send}>
            Mai Departe
          </Link>
        </div>
      </div>
    );
  }
}
