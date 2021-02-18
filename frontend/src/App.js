import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Session from "./components/session.components";
import Participant from "./components/participants.components";
import SessionsList from "./components/sessions-list.components";
import ParticipantsList from "./components/participants-list.components";
import AddSession from "./components/add-session.components";
import EditSession from "./components/edit-session.components";
import AddParticipants from "./components/add-participant.components";
import LogIn from "./components/login.components";
import SignUp from "./components/sign-up.components";
import EditParticipants from "./components/edit-participants.components";

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
                List Sessions
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addsession"} className="nav-link">
                Add Sessions
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/editsession"} className="nav-link">
                Edit Sessions
              </Link>            
            </li>
            <li className="nav-item">
              <Link to={"/participants"} className="nav-link">
                Participants List
              </Link>            
            </li>
            <li className="nav-item">
              <Link to={"/editparticipants"} className="nav-link">
                Edit Participants
              </Link>            
            </li>
            <li className="nav-item">
              <Link to={"/addparticipants"} className="nav-link">
                Add Participants
              </Link>            
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Log In
              </Link>            
            </li>
            <li className="nav-item">
              <Link to={"/signup"} className="nav-link">
                Sign up
              </Link>            
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/sessions"]} component={SessionsList} />
            <Route exact path="/participants" component ={ParticipantsList} />
            <Route exact path="/addsession" component={AddSession} />
            <Route path="/sessions/:id" component={Session} />
            <Route exact path="/editsession" component ={EditSession} />
            <Route exact path="/login" component ={LogIn} />
            <Route exact path="/addparticipants" component ={AddParticipants} />
            <Route path="/participants/:id" component ={Participant} />
            <Route exact path="/signup" component ={SignUp} />
            <Route exact path="/editparticipants" component ={EditParticipants} />
          </Switch>
        </div>
      </div>
    );
  }

}

export default App;
