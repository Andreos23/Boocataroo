import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Location.css";

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      id: "",
      name: "",
    };
  }

  async getOptions() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const data = res.data;

    const options = data.map((d) => ({
      value: d.id,
      label: d.name,
    }));

    this.setState({ selectOptions: options });
  }

  handleChange(e) {
    this.setState({ id: e.value, name: e.label });
    console.log(e.label);
    this.props.changeLocation(e.label);
  }

  componentDidMount() {
    this.getOptions();
  }

  render() {
    console.log(this.state.selectOptions);
    return (
      <div className="location">
        <div className="location-box">
          <div>
            <p className="location-header">In ce oras cauti treaba?</p>

            <Select
              options={this.state.selectOptions}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <div>
            <p className="location-header">Vrei sa lucrezi ca...</p>
            <div className="location-btns">
              <Link to="/chef" className="location-btn">
                <p className="btn-text-location">Bucatar</p>
              </Link>

              <Link to="/chef" className="location-btn">
                <p className="btn-text-location">Barman</p>
              </Link>

              <Link to="/chef" className="location-btn">
                <p className="btn-text-location">Chelner</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
