import axios from "axios";
import React from "react";
import { addUser } from './APIRoutes.js';
import './addUser.css';

export default class AddUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            successful: false,
            id: '',
            name: '',
            email: '',
            splashID: '',
            authID: '',
            errors: new Array(5).fill(' '),
        }     
    }
    handleUpdateID(e) {
        const value = e.target.value;
        this.setState({
            id: value,
        })
    }
    handleUpdateName(e) {
        const value = e.target.value;
        this.setState({
            name: value,
        })
    }
    handleUpdateEmail(e) {
        const value = e.target.value;
        this.setState({
            email: value,
        })
    }
    handleUpdateSplashID(e) {
        const value = e.target.value;
        this.setState({
            splashID: value,
        })
    }
    handleUpdateAuthID(e) {
        const value = e.target.value;
        this.setState({
            authID: value,
        })
    }
    handleUpdateID(e) {
        const value = e.target.value;
        this.setState({
            id: value,
        })
    }
    handleSubmit() {
        console.log('submit!');
        console.log(this.state);
        if (!this.state.name || !this.state.email || !this.state.splashID || !this.state.id || !this.state.authID) {
            console.log('wtf');
            this.handleErrors();
        } else {
            console.log("GETS HERE");
            axios(addUser({
                id: parseInt(this.state.id),
                name: this.state.name,
                email: this.state.email,
                splash: parseInt(this.state.splashID),
                authID: parseInt(this.state.authID),
            }))
            .then((response, error) => {
                if (error) {
                    console.log("Error creating user");
                } else {
                    console.log("User created successfully!");
                    this.setState({
                        successful: true,
                    })
                }
            })
            this.setState({
                name: '',
                email: '',
                id: '',
                splashID: '',
                authID: '',
                errors: new Array(5).fill(' '),
            })
        }
    }
    handleErrors() {
        var errs = new Array(5).fill('');
        errs[0] = this.state.name === '' ? 'Please enter a name: ' : ' ';
        errs[1] = this.state.email === '' ? 'Please enter an email: ' : ' ';
        errs[2] = this.state.splashID === '' ? 'Please enter a splashID: ' : ' ';
        errs[3] = this.state.id === '' ? 'Please enter the Makerspace ID: ' : ' ';
        errs[4] = this.state.authID === '' ? 'Please enter an authID: ' : ' ';
        this.setState({
            errors: errs,
        })
    }




    render() {
        if (this.state.successful) {
            return (
                <div>
                  <h1 id="text">Successfully Added User!</h1>
                  <form action="/">
                    <button className="doneButton">Go Back</button>
                  </form>
                </div>
              )

          }
        return (
            <div>
                <div id="error-container">
                    <h3 id="error">{this.state.errors[0]}</h3>
                    <h3 id="error">{this.state.errors[1]}</h3>
                    <h3 id="error">{this.state.errors[2]}</h3>
                    <h3 id="error">{this.state.errors[4]}</h3>
                    <h3 id="error">{this.state.errors[3]}</h3>
                </div>
                <div id="container">
                    <div>
                        <input 
                            id = "input2"
                            className="nameInputBox"
                            value={this.state.name}
                            onChange={(e) => this.handleUpdateName(e)}
                            autoComplete="off"
                            placeholder="Name"
                            />
                    </div>
                    <div>
                        <input
                        id = "input2"
                            className="nameInputBox"
                            value={this.state.email}
                            onChange={(e) => this.handleUpdateEmail(e)}
                            autoComplete="off"
                            placeholder="Tulane Email"
                            />
                    </div>
                    <div>
                        <input
                            id = "input2"
                            className = "nameInputBox"
                            value={this.state.splashID}
                            onChange={(e) => this.handleUpdateSplashID(e)}
                            autoComplete="off"
                            placeholder="Splash ID"
                            />
                    </div>
                    <div>
                        <input 
                            id = "input2"
                            className="nameInputBox"
                            value={this.state.authEmail}
                            onChange={(e) => this.handleUpdateAuthID(e)}
                            autoComplete="off"
                            placeholder="authID"
                            />
                    </div>
                    <div>
                        <input 
                            id = "input2"
                            className="nameInputBox"
                            value={this.state.id}
                            onChange={(e) => this.handleUpdateID(e)}
                            autoComplete="off"
                            placeholder="Makerspace ID"
                            />
                    </div>
                </div>
                <div>
                    <button className = "submitButton" onClick={() => this.handleSubmit()}>Submit</button>
                </div>
            </div>
        );
    }
}