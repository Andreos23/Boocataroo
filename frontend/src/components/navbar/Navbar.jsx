import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import "./Navbar.css";
import logo from "./../../assets/logo site v2.png";

export default class CustomNavbar extends React.Component {
  constructor() {
    super();
    this.state = {
      isDesktop: false,
    };
    this.updatePredicate = this.updatePredicate.bind(this);
  }
  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isDesktop: window.innerWidth > 991 });
  }

  render() {
    return (
      <Navbar expand="lg" className="min-vh-8" sticky="top">
        <Navbar.Brand href="/">
          <img src={logo} className="d-inline-block logo" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto mt-2 mt-lg-0 big-txt">
            <Nav.Link href="/about">Despre</Nav.Link>
            {this.state.isDesktop && <Nav.Link>|</Nav.Link>}
            <Nav.Link href="/packages">Pachete</Nav.Link>
            {this.state.isDesktop && <Nav.Link>|</Nav.Link>}
            <Nav.Link href="/reviews">Păreri</Nav.Link>
            {this.state.isDesktop && <Nav.Link>|</Nav.Link>}
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
