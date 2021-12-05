import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";

import "./Ads.css";
import JobButton from "../jobButton/JobButton";
import Postit from "../postit/Postit";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

export default class Ads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: [
        {
          title: "Bucatar cu experienta",
          cashLow: "4000",
          cashHigh: "4001",
          body: "Di’Vino Pizza, cu locatia in sector 6, Str. Prelungirea Ghencea,\
          angajeaza bucatar pe cald Doar cu experienta in domeniu.Disciplina si\
          dexteritate; Spirit de echipa si seriozitate la locul de munca. Oferta\
          de lucru: Salariul este de 4000 Lei; Transport seara asigurat; Masa si\
          cafea asigurata.Program de lucru: 2/2 zile",
        },
      ],
      shownads: [],
      shownNum: 8,
    };
    this.inc = this.inc.bind(this);
  }

  inc() {
    let { shownNum } = this.state;
    this.setState({ shownNum: shownNum + 8 });
    this.setState({ shownads: this.state.ads.slice(0, this.state.shownNum) });
    console.log(this.state.shownNum);
  }

  render() {
    return (
      <div className="ads">
        {this.state.shownads.map((ad, index) => (
          <Postit
            title={ad.title}
            cashLow={ad.cashLow}
            cashHigh={ad.cashHigh}
            body={ad.body}
            key={index}
          />
        ))}

        <button className="loadings-ads-btn" onClick={this.inc}>
          Mai multe
        </button>
      </div>
    );
  }
}
