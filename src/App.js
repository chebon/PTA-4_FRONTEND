import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPatient from "./components/AddPatient";
import Patient from "./components/Patient";
import PatientsList from "./components/PatientsList";
import AddLocation from "./components/AddLocation";
import Addreport from "./components/Addreport";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          PT4A
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Patient
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/report"} className="nav-link">
              Report Summary
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/location"} className="nav-link">
              Add Location
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/patients"]} component={PatientsList} />
          <Route exact path="/add" component={AddPatient} />
          <Route exact path="/location" component={AddLocation} />
          <Route exact path="/report" component={Addreport} />
          <Route path="/diagnosis/create/:id" component={Patient} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
