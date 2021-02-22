import React, { Component } from "react";
import ParticipantsDataService from "../services/participants.service";
import { Link } from "react-router-dom";

export default class ParticipantsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveParticipants = this.retrieveParticipants.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveParticipant = this.setActiveParticipant.bind(this);
        this.removeAllParticipants = this.removeAllParticipants.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            participants: [],
            currentParticipant: null,
            currentIndex: -1,
            searchName: ""
        };
    }
    
    
    componentDidMount() {
        this.retrieveParticipants();
    }
    

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    retrieveParticipants() {
        ParticipantsDataService.getAll()
        .then(response => {
            this.setState({
                participants: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    refreshList() {
        this.retrieveParticipants();
        this.setState({
            currentParticipant: null,
            currentIndex: -1
        });
    }

    setActiveParticipant(participant, index) {
        this.setState({
            currentParticipant: participant,
            currentIndex: index
        });
    }

    removeAllParticipants() {
        ParticipantsDataService.deleteAll()
        .then(response => {
            console.log(response.data);
            this.refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    }

    searchName() {
        this.setState({
            currentName: null,
            currentIndex: -1
        });

        ParticipantsDataService.findByName(this.state.searchName)
        .then(response => {
            this.setState({
                participants: response.data
            });
            console.log(response.data);
        })
        .catch (e => {
            console.log(e);
        });
    }

    render() {
        const { searchName, participants, currentParticipant, currentIndex } = this.state;

        return (
            <div className="list row">
              <div className="col-md-8">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name"
                    value={searchName}
                    onChange={this.onChangeSearchName}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={this.searchName}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4>Participants List</h4>
      
                <ul className="list-group">
                  {participants &&
                    participants.map((participant, index) => (
                      <li
                        className={
                          "list-group-item " +
                          (index === currentIndex ? "active" : "")
                        }
                        onClick={() => this.setActiveParticipant(participant, index)}
                        key={index}
                      >
                        {participant.name}
                      </li>
                    ))}
                </ul>
      
                <button
                  className="m-3 btn btn-sm btn-danger"
                  onClick={this.removeAllParticipants}
                >
                  Remove All
                </button>
              </div>
              <div className="col-md-6">
                {currentParticipant ? (
                  <div>
                    <h4>Participant</h4>
                    <div>
                      <label>
                        <strong>Name:</strong>
                      </label>{" "}
                      {currentParticipant.name}
                    </div>
                    <div>
                      <label>
                        <strong>Email:</strong>
                      </label>{" "}
                      {currentParticipant.email}
                    </div>
                    <div>
                      <label>
                        <strong>Phone:</strong>
                      </label>{" "}
                      {currentParticipant.phone}
                    </div>

                  </div>
                ) : (
                  <div>
                    <br />
                    <p>Please click on a Participant</p>
                  </div>
                )}
              </div>
              
            </div>
        );
    
    }
}