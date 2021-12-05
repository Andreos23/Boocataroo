import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";

import "./Postit.css";
import JobButton from "../jobButton/JobButton";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { throwStatement } from "@babel/types";

export default class Postit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="post-it">
        <h1 className="ad-title">{this.props.title}</h1>

        <p className="ad-cash">
          {this.props.cashLow}-{this.props.cashHigh}
        </p>

        <p className="ad-body">{this.props.body}</p>

        <button className="ad-button">More</button>
      </div>
    );
  }
}
