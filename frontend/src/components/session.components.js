import React, { Component } from "react";
import SessionDataService from "../services/session.service";

export default class Session extends Component {
    constructor(props) {
        super(props);
        this.onChangeSubject = this.onChangeSubject.bind(this);
        this.onChangeDepartment = this.onChangeDepartment.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeFinish = this.onChangeFinish.bind(this);
        this.onChangeVenue = this.onChangeVenue.bind(this);
        this.getSession = this.getSession.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateSession = this.updateSession.bind(this);
        this.deleteSession = this.deleteSession.bind(this);

        this.state = {
            currentSession: {
                id: null,
                subject: "",
                department: "",
                type: "",
                start: "",
                finish: "",
                venue: "",
                done: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getSession(this.props.match.params.id);
    }

    onChangeSubject(e) {
        const subject = e.target.value;

        this.setState(function(prevState) {
            return {
                currentSession: {
                    ...prevState.currentSession,
                    subject: subject
                }
            };
        });
    }

    onChangeDepartment(e) {
        const department = e.target.value;

        this.setState(prevState => ({
            currentSession: {
                ...prevState.currentSession,
                department: department
            }
        }));
    }

    onChangeType(e) {
        const type = e.target.value;

        this.setState(prevState => ({
            currentSession: {
                ...prevState.currentSession,
                type: type
            }
        }));
    }

    onChangeStart(e) {
        const start = e.target.value;

        this.setState(prevState => ({
            currentSession: {
                ...prevState.currentSession,
                start: start
            }
        }));
    }

    onChangeFinish(e) {
        const finish = e.target.value;

        this.setState(prevState => ({
            currentSession: {
                ...prevState.currentSession,
                finish: finish
            }
        }));
    }

    onChangeVenue(e) {
        const venue = e.target.value;

        this.setState(prevState => ({
            currentSession: {
                ...prevState.currentSession,
                venue: venue
            }
        }));
    }

    getSession(id) {
        SessionDataService.get(id)
        .then(response => {
            this.setState({
                currentSession: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    updatePublished(status) {
        var data = {
            id: this.state.currentSession.id,
            subject: this.state.currentSession.subject,
            type: this.state.currentSession.type,
            start: this.state.currentSession.start,
            finish: this.state.currentSession.finish,
            venue: this.state.currentSession.venue,
            published: status
        };

        SessionDataService.update(this.state.currentSession.id, data)
        .then(response => {
            this.setState(prevState => ({
                currentSession: {
                    ...prevState.currentSession
                }
            }));
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    updateSession() {
        SessionDataService.update(
            this.state.currentSession.id,
            this.state.currentSession
        )
        .then(response => {
            console.log(response.data);
            this.setState({
                message: "This session has been updated successfully."
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    deleteSession() {
        SessionDataService.delete(this.state.currentSession.id)
        .then(response => {
            console.log(response.data);
            this.props.history.push('/sessions')
        })
        .catch(e => {
            console.log(e);
        });
    }

    render() {
        const {currentSession} = this.state;

        return (
            <div>
                {currentSession ? (
                    <div className="edit-form">
                        <h4>Session</h4>
                        <form>
                            <div className="form-group">
                                <lable htmlFor="subject">Subject</lable>
                                <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={currentSession.subject}
                                onChange={this.onChangeSubject}
                                />
                            </div>

                            <div className="form-group">
                                <lable htmlFor="department">Department</lable>
                                <input
                                type="text"
                                className="form-control"
                                id="department"
                                velue={currentSession.department}
                                onChange={this.onChangeDepartment}
                                />
                            </div>

                            <div className="form-group">
                                <lable htmlFor="type">Type</lable>
                                <input
                                type="text"
                                className="form-control"
                                id="type"
                                velue={currentSession.type}
                                onChange={this.onChangeType}
                                />
                            </div>

                            <div className="form-group">
                                <lable htmlFor="start">Start</lable>
                                <input
                                type="text"
                                className="form-control"
                                id="start"
                                velue={currentSession.start}
                                onChange={this.onChangeStart}
                                />
                            </div>

                            <div className="form-group">
                                <lable htmlFor="finish">Finish</lable>
                                <input
                                type="text"
                                className="form-control"
                                id="finish"
                                velue={currentSession.finish}
                                onChange={this.onChangeFinish}
                                />
                            </div>

                            <div className="form-group">
                                <lable htmlFor="venue">Venue</lable>
                                <input
                                type="text"
                                className="form-control"
                                id="venue"
                                velue={currentSession.venue}
                                onChange={this.onChangeVenue}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Status</strong>
                                </label>
                                {currentSession.published ? "Published" : "Pending"}
                            </div>
                        </form>

                        {currentSession.published ? (
                            <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updatePublished(false)}
                            >
                                Unpublish
                            </button>
                        ) : (
                            <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updatePublished(true)}
                            >
                                Publish
                            </button>
                        
                        )}

                        <button
                        className="badge badge-danger mr-2"
                        onClick={this.deleteSession}
                        >
                            Delete
                        </button>

                        <button
                        type="submit"
                        className="badge badge-success"
                        onClick={this.updateSession}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>

                    </div>
                ) : (
                    <div>
                        <br />
                        <p> Please click on a Session </p>
                        </div>
                )}
            </div>
        );
    }

}

