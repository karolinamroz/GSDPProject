import React, { Component } from "react";
import ParticipantDataService from "../services/participants.service";


export default class AddParticipant extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.saveParticipant = this.saveParticipant.bind(this);
        this.newParticipant = this.newParticipant.bind(this);

        this.state = {
            id: null,
            name: "",
            email: "",
            phone: "",
            role: "",
            password: ""
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

    onChangeRole(e) {
        this.setState({
            role: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    saveParticipant() {
        var data = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            role: this.state.role,
            password: this.state.password
        };

        ParticipantDataService.create(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                phone: response.data.phone,
                role: response.data.role,
                password: response.data.password
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
            role: "",
            password: ""
        });
    }

    render() {
      return (
        <div className="submit-form">
          {this.state.submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newParticipant}>
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
                <label htmlFor="type">Phone</label>
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

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  className="form-control"
                  id="role"
                  required
                  value={this.state.role}
                  onChange={this.onChangeRole}
                  name="role"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  required
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  name="password"
                />
              </div>
  
              <button onClick={this.saveParticipant} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
}