import React from "react";

import "./Landing.css";
import { Link } from "react-router-dom";
class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.history.push("location");
  }

  render() {
    return (
      <div className="landing">
        <div className="landing-box">
          <p className="landing-header">Esti ?</p>
          <div className="landing-btns">
            <Link
              to="/location"
              className="landing-btn"
              onClick={this.handleClick}
            >
              <p className="btn-text-land">Angajat</p>
            </Link>
            <button className="landing-btn">
              <p className="btn-text-land">Angajator</p>
            </button>
          </div>
          <p className="about">
            Nu-ti face probleme, noi la Bucataroo facem angajarea cat mai simpla
            pentru tine!
          </p>
        </div>
      </div>
    );
  }
}

export default Landing;
