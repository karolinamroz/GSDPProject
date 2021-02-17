import React, { Component } from "react";
import ParticipantDataService from "../services/participants.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

export default class AddParticipant extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            id: null,
            name: "",
            email: "",
            phone: "",
            role: "",
            password: "",
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
            password: this.state.pasword
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
          <div className="col-md-12">
            <div className="card card-container">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />
    
              <Form>
                  <div>
                    <div className="form-group">
                      <label htmlFor="username">Name</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="username"
                        value={this.state.name}
                        onChange={this.onChangeName}
                      />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                      />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Input
                        type="password"
                        className="form-control"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                      />
                    </div>
    
                    <div className="form-group">
                      <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                  </div>
    
                <CheckButton
                  style={{ display: "none" }}
                  onClick={this.saveParticipant}
                />
              </Form>
            </div>
          </div>
        );
      }
}