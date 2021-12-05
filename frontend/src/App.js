import './App.css';
import React from 'react';
import {
  BrowserRouter,
  Route,
  Navigate,
  Routes
} from "react-router-dom";
import Nav from "./components/navbar/Navbar"

import Landing from './components/landing/Landing';
import Location from './components/client/location/Location';
import Chef from './components/client/chef/Chef';
import ContactInfo from './components/client/contactInfo/ContactInfo';
import Specialty from './components/client/specialty/Specialty';
import Ads from './components/client/ads/Ads';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: '',
      jobTitles: [],
      jobType: '',
      specialties: [],
      email: '',
      phone: ''
    }
    this.changeLocation = this.changeLocation.bind(this);
    this.changeJobs = this.changeJobs.bind(this);
    this.changeSpecialties = this.changeSpecialties.bind(this);
    this.setJobType = this.setJobType.bind(this);
  }

  changeLocation(location) {
    this.setState({location: location});
    console.log(location);
  }

  changeJobs(jobs) {
    this.setState({jobTitles: jobs});
    console.log(this.state.jobTitles);
  }

  changeSpecialties(speshs) {
    this.setState({specialties: speshs});
    console.log(this.state.jobTitles);
  }

  setJobType(type) {
    this.setState({jobType: type});
    console.log(this.state.jobType);
  }

  setEmail(email) {
    this.setState({email: email});
  }

  setPhone(phone) {
    this.setState({phone: phone});
  }

  render() {
    return (
      <div className='App'>
        <Nav/>
        <div className='page'>
          <BrowserRouter>
        <Routes>
        <Route path="chef/specialty/contact/ads" element={<Ads />} />

        <Route path="chef/specialty/contact" element={<ContactInfo setEmail={this.setEmail} setPhone={this.setPhone} />} />

        <Route path="chef/specialty" element={<Specialty changeSpecialties={this.changeSpecialties}/>} />

          <Route path="chef" element={<Chef changeJobs={this.changeJobs} setJobType={this.setJobType}/>} />
        <Route path="location" element={<Location changeLocation={this.changeLocation}/>} />

      <Route path="/" element={<Landing />}>
      </Route>
    </Routes>
  </BrowserRouter>,
        </div>
      </div>
    );
  }
}

export default App;
