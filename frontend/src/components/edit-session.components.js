import React, { Component } from "react";
import SessionDataService from "../services/session.service";
import { Link } from "react-router-dom";

export default class SessionsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchSubject = this.onChangeSearchSubject.bind(this);
        this.retrieveSessions = this.retrieveSessions.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveSession = this.setActiveSession.bind(this);
        this.removeAllSessions = this.removeAllSessions.bind(this);
        this.searchSubject = this.searchSubject.bind(this);

        this.state = {
            sessions: [],
            currentSession: null,
            currentIndex: -1,
            searchSubject: ""
        };
    }

    componentDidMount() {
        this.retrieveSessions();
    }

    onChangeSearchSubject(e) {
        const searchSubject = e.target.value;

        this.setState({
            searchSubject: searchSubject
        });
    }

    retrieveSessions() {
        SessionDataService.getAll()
        .then(response => {
            this.setState({
                sessions: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveSessions();
        this.setState({
            currentSession: null,
            currentIndex: -1
        });
    }

    setActiveSession(session, index) {
        this.setState({
            currentSession: session,
            currentIndex: index
        });
    }

    removeAllSessions() {
        SessionDataService.deleteAll()
        .then(response => {
            console.log(response.data);
            this.refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    }

    searchSubject() {
        this.setState({
            currentSession: null,
            currentIndex: -1
        });

        SessionDataService.findBySubject(this.state.searchSubject)
        .then(response => {
            this.setState({
                sessions: response.data
            });
            console.log(response.data);
        })
        .catch (e => {
            console.log(e);
        });
    }

    render() {
        const { searchSubject, sessions, currentSession, currentIndex } = this.state;

        return (
            <div className="list row">
              <div className="col-md-8">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by subject"
                    value={searchSubject}
                    onChange={this.onChangeSearchSubject}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={this.searchSubject}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4>Sessions List</h4>
      
                <ul className="list-group">
                  {sessions &&
                    sessions.map((session, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveSession(session, index)}
                        key={index}
                      >
                        {session.subject}
                      </li>
                    ))}
                </ul>
      
                <button
                  className="m-3 btn btn-sm btn-danger"
                  onClick={this.removeAllSessions}
                >
                  Remove All
                </button>
              </div>
              <div className="col-md-6">
                {currentSession ? (
                  <div>
                    <h4>Session</h4>
                    <div>
                      <label>
                        <strong>Subject:</strong>
                      </label>{" "}
                      {currentSession.subject}
                    </div>
                    <div>
                      <label>
                        <strong>Department:</strong>
                      </label>{" "}
                      {currentSession.department}
                    </div>
                    <div>
                      <label>
                        <strong>Type:</strong>
                      </label>{" "}
                      {currentSession.type}
                    </div>
                    <div>
                      <label>
                        <strong>Start:</strong>
                      </label>{" "}
                      {currentSession.start}
                    </div>
                    
                    <div>
                      <label>
                        <strong>Finish:</strong>
                      </label>{" "}
                      {currentSession.finish}
                    </div>
                    <div>
                      <label>
                        <strong>Venue:</strong>
                      </label>{" "}
                      {currentSession.venue}
                   </div>
                    <div>
                      <label>
                        <strong>Status:</strong>
                      </label>{" "}
                      {currentSession.published ? "Published" : "Pending"}
                    </div>

                    <Link
                      to={"/sessions/" + currentSession.id}
                      className="badge badge-warning"
                    >
                      Edit
                    </Link>

                  </div>
                ) : (
                  <div>
                    <br />
                    <p>Please click on a Session to edit</p>
                  </div>
                )}
              </div>
            </div>
        );
    
    }
}