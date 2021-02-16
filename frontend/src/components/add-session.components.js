import React, { Component } from "react";
import SessionDataService from "../services/session.service";

export default class AddSession extends Component {
    constructor(props) {
        super(props);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeFinish = this.onChangeFinish.bind(this);
        this.onChangeVenue = this.onChangeVenue.bind(this);
        this.saveSession = this.saveSession.bind(this);
        this.newSession = this.newSession.bind(this);

        this.state = {
            id: null,
            subject: "",
            department: "",
            type: "",
            start: "",
            finish: "",
            venue: "",
            published: false,

            submitted: false
        };
    }

    onChangeSubject(e) {
        this.setState({
            subject: e.target.value
        });
    }

    onChangeDepartment(e) {
        this.setState({
            department: e.target.value
        });
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }

    onChangeStart(e) {
        this.setState({
            start: e.target.value
        });
    }

    onChangeFinish(e) {
        this.setState({
            finish: e.target.value
        });
    }

    onChangeVenue(e) {
        this.setState({
            venue: e.target.value
        });
    }

    saveSession() {
        var data = {
            subject: this.state.subject,
            department: this.state.department,
            type: this.state.type,
            start: this.state.start,
            finish: this.state.finish,
            venue: this.state.venue
        };

        SessionDataService.create(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                subject: response.data.subject,
                department: response.data.department,
                type: response.data.type,
                start: response.data.start,
                finish: response.data.finish,
                venue: response.data.venue,
                published: response.data.published,

                submitted: true
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    newSession() {
        this.setState = ({
            id: null,
            subject: "",
            department: "",
            type: "",
            start: "",
            finish: "",
            venue: "",
            published: false,

            submitted: false
        });
    }

    render() {
        return (
          <div className="submit-form">
            {this.state.submitted ? (
              <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newSession}>
                  Add
                </button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    required
                    value={this.state.subject}
                    onChange={this.onChangeSubject}
                    name="subject"
                  />
                </div>
    
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <input
                    type="text"
                    className="form-control"
                    id="department"
                    required
                    value={this.state.department}
                    onChange={this.onChangeDepartment}
                    name="department"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    required
                    value={this.state.type}
                    onChange={this.onChangeType}
                    name="type"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="start">Start</label>
                  <input
                    type="text"
                    className="form-control"
                    id="start"
                    required
                    value={this.state.start}
                    onChange={this.onChangeStart}
                    name="start"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="finish">Finish</label>
                  <input
                    type="text"
                    className="form-control"
                    id="finish"
                    required
                    value={this.state.finish}
                    onChange={this.onChangeFinish}
                    name="subject"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="venue">Venue</label>
                  <input
                    type="text"
                    className="form-control"
                    id="venue"
                    required
                    value={this.state.venue}
                    onChange={this.onChangeVenue}
                    name="venue"
                  />
                </div>
    
                <button onClick={this.saveSession} className="btn btn-success">
                  Submit
                </button>
              </div>
            )}
          </div>
        );
      }

}