import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Session from "./components/session.components";
import SessionsList from "./components/sessions-list.components";
import AddSession from "./components/add-session.components";
import EditSession from "./components/edit-session.components";
import SignUp from "./components/add-participant.components";
import LogIn from "./components/login.components";

class App extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/sessions"} className="navbar-brand">
            OpenDay Booking
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/sessions"} className="nav-link">
                Sessions
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/edit"} className="nav-link">
                Edit
              </Link>            
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Log In
              </Link>            
            </li>
            <li className="nav-item">
              <Link to={"/signup"} className="nav-link">
                Sign Up
              </Link>            
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/sessions"]} component={SessionsList} />
            <Route exact path="/add" component={AddSession} />
            <Route path="/sessions/:id" component={Session} />
            <Route exact path="/edit" component ={EditSession} />
            <Route exact path="/login" component ={LogIn} />
            <Route exact path="/signup" component ={SignUp} />
          </Switch>
        </div>
      </div>
    );
  }

}

export default App;
