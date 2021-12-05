import React from "react";
import "./JobButton.css";

export default class JobButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.title);
    this.setState({ isDisabled: true });
  }

  render() {
    return (
      <button
        className="job-btn"
        onClick={this.handleClick}
        disabled={this.state.isDisabled}
      >
        <p className="job-btn-text">{this.props.title}</p>
      </button>
    );
  }
}
