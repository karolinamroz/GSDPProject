import React, { Component } from "react";
import ParticipantsDataService from "../services/participants.service";
import { Link } from "react-router-dom";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);

        this.state = {
            id: null,
            name: "",
            email: "",
            phone: "",

            submitted: false
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    saveParticipant() {
        var data = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone
        };

        ParticipantsDataService.create(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                phone: response.data.phone,

                submitted: true
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    newParticipant() {
        this.setState = ({
            id: null,
            name: "",
            email: "",
            phone: "",

            submitted: false
        });
    }

    render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>You signed-up successfully!</h4>
                <button className="btn btn-success" onClick={this.newSession}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    required
                    value={this.state.name}
                    onChange={this.onChangeName}
                    name="name"
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    required
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    name="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    required
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                    name="phone"
                  />
                </div>
    
                <button onClick={this.saveParticipant} className="btn btn-success">
                  Submit your details
                </button>
              </div>
            )}
          </div>
        );
      }
}