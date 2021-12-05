import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";

import "./Chef.css";
import JobButton from "../jobButton/JobButton";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

export default class Chef extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: false, //Set render state to false
      jobTypes: [
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
      ],
      shownJobs: [
        "asistent bucatar",
        "sef bucatar",
        "spalator",
        "patiser",
        "cofetar",
      ],
      sentJobs: [],
      showNum: 5,
      jobType: "",
    };
    this.incShow = this.incShow.bind(this);
    this.addJobs = this.addJobs.bind(this);
    this.addAllJobs = this.addAllJobs.bind(this);
    this.setJobType = this.setJobType.bind(this);
    this.send = this.send.bind(this);
  }

  incShow(job) {
    let { showNum } = this.state;
    this.setState({ showNum: showNum + 5 });
    console.log(this.state.showNum);
  }

  addJobs(job) {
    const jobs = [...this.state.sentJobs, job];
    this.setState({ sentJobs: jobs });
    this.props.changeJobs(this.state.sentJobs);
  }

  addAllJobs(job) {
    this.setState({ sentJobs: this.state.shownJobs });
    this.props.changeJobs(this.state.sentJobs);
  }

  setJobType(job) {
    this.setState({ jobType: job });
    this.props.setJobType(this.state.jobType);
  }

  send() {
    this.props.changeJobs(this.state.sentJobs);
    this.props.setJobType(this.state.jobType);
  }

  componentDid;

  render() {
    return (
      <div className="chef">
        <div className="chef-box">
          <p className="chef-headline">Asadar, vrei sa fii bucatar!</p>

          <div className="job-title">
            <p className="chef-header">Pe ce post iti doresti sa lucrezi?</p>
            <div className="job-btns">
              {this.state.jobTypes
                .slice(0, this.state.showNum)
                .map((job, index) => (
                  <JobButton
                    title={job}
                    key={index}
                    handleClick={this.addJobs}
                  />
                ))}
              <JobButton title="orice" handleClick={this.addAllJobs} />
              <JobButton title="+ mai multe" handleClick={this.incShow} />
            </div>
          </div>

          <div className="job-type">
            <p className="chef-header">Ce fel de program?</p>
            <div className="job-btns">
              <JobButton title="part-time" handleClick={this.setJobType} />
              <JobButton title="full-time" handleClick={this.setJobType} />
            </div>
          </div>

          {/* <button className="landing-btn-next" onClick={this.send}>
            Mai Departe
          </button> */}
          <Link to="specialty" className="landing-btn-next" onClick={this.send}>
            Mai Departe
          </Link>
        </div>
      </div>
    );
  }
}
