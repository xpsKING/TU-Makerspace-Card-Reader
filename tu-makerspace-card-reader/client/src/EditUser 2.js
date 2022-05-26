import axios from 'axios';
import React from 'react';
import './EditUser.css';
import { getUser, editUser, hasPassword, getUserEmail } from './APIRoutes.js';
import Inputs from './Inputs.js';
import DisplayChecks from './DisplayChecks.js';

/** Edit User
 * 
 *  Enter a fabtech's ID number, and the page for editing can be accessed:
 *   - Checkboxes to represent trainings that the entered user ID has (otherwise none appear)
 *   - To toggle a checkbox --> FabTech must enter either their ID or email username AND password
 *   - If a fabtech does not have a password, a "Create Password" box will appear. 
 *       - Requires another fabtech's login information to create password
 *   - If a fabtech does have a password, an "Edit Password" button will appear
 *       - Can use own password to create a new password
 *       - Brings up the Create password input box
 *   - ADMIN ONLY: If an admin's ID is entered on the initial page, a FabTech checkbox will appear under 
 *       any user viewed. Only an admin's ID/username & password will allow the change of this state.  
 */

 
 // displays the checkboxes based on the trainings

// only displays the done button if a user was found
function ConditionalButton(props) {
    if (props.trainings.length !== 0) {
        return (
            <form action="/">
                <button className="BetterButton" id="submit">Done</button>
            </form>
        )
    } else {
        return null;
    }
}
// renders the inputs and buttons around both creating / editing the password
// creating if they're a fabtech and hasPassword is false
function EditPassword(props) { 
    if (props.userIsFabTech && !props.hasPassword) { // create password
        return (
            <div>
                <Inputs
                    type="password"
                    className="BoxInput"
                    placeholder="Create Password"
                    value={props.createdPassword}
                    variable="createdPassword"
                    parentCallBack={props.handleCallBack}
                    />
                <button className="BetterButton"  onClick={() => props.handleCreatePassword()}>Submit</button>
            </div>
        )
    } else if (props.userIsFabTech) { // edit password
        return (
            <button className="BetterButton" id="biggerButton" onClick={() => props.handleCreatePassword()}>Edit Password</button>
        )
    }
    return null; // returns nothing if not a fabtech
}

export default class EditUser extends React.Component {
    constructor(props) {
        super(props);
        //EXAMPLE TRAININGS ARRAY
        // [ ["lathe", 0],
        // ["metal1", 1],
        // ["metal2", 0],
        // ["mill", 1],
        // ["waterjet", 0],
        // ["wood1", 1],
        // ["wood2", 1] ]
        this.state = ({
            id: '',
            idINT: NaN,
            authID: '',
            authPassword: '',
            user: {},
            userTrainings: [],
            userIsFabTech: false,
            fabTechID: '',
            isFabTech: false,
            isAdmin: false,
            hasPassword: false,
            createdPassword: '',
        })
        // allows functions called from the render function to be properly run
        this.handleChange = this.handleChange.bind(this);
        this.handleCallBack = this.handleCallBack.bind(this);
        this.handleFindUser = this.handleFindUser.bind(this);
        this.toggleFabTech = this.toggleFabTech.bind(this);
        this.handleCreatePassword = this.handleCreatePassword.bind(this);
    }
    // only allows a valid FabTech ID to access the editing page
    // may later remove the input of a fabtech ID on the editing page and only require password (Note from bennett: instead of removing it we should just autofill)
    handleFabTechCheck() {
        let er = false;
        let id = parseInt(this.state.fabTechID);
        if (!id) { //if id is a tulane login instead, changes id into the actual id:
            er = true;
            axios(getUserEmail(this.state.fabTechID))
                .then((response, error) => {
                    if (error) {
                        console.log('Problem retrieving users...');
                    }
                    else {
                        er = false;
                        id = response.data.id;
                    }
                }).catch((er) => {
                    this.handleFindUser();
                })
        } 
        if (!er) { // if no error in case the email was called first
            axios(getUser(id))
                .then((response, error) => {
                    if (error) {
                        console.log('Problem retrieving users...');
                    }
                    else {
                        if (response.data.fabTech || response.data.admin) {
                            this.setState({
                                isFabTech: response.data.fabTech,
                                isAdmin: response.data.admin,
                                authID: this.state.fabTechID,
                            })
                        }
                        else {
                            console.log("not a fabtech/admin!");
                        }
                    }
                }).catch((err) => {
                    this.handleFindUser();
                })
        }
    }
    // finds the user to display
    handleFindUser() {
        let trainings;
        var er = false;
        if (this.state.id) {
            const id = parseInt(this.state.id);
            if (!id) { // if id is an email
                axios(getUserEmail(this.state.id))
                .then((response, error) => {
                    if (error) {
                        er = true;
                        console.log('Error finding User');
                    } else {
                        this.setState({
                            id: response.data.id,
                        })
                        this.handleFindUser();
                    }
                }).catch((err) => {
                    er = true;
                })
            }
            if (!er && parseInt(this.state.id)) { // if no error in case the email was called first
                axios(getUser(parseInt(this.state.id))).then((response, error) => {
                    if (error) {
                        console.log('Error finding User');
                    } else {
                        console.log(response.data);
                        this.setState({
                            user: response.data,
                            idINT: id,
                            userIsFabTech: response.data.fabTech,
                            hasPassword: response.data.password,
                        })
                        trainings = [
                            ["lathe", response.data.lathe],
                            ["metal1", response.data.metal1],
                            ["metal2", response.data.metal2],
                            ["mill", response.data.mill],
                            ["waterjet", response.data.waterjet],
                            ["wood1", response.data.wood1],
                            ["wood2", response.data.wood2],
                            ];
                        this.setState({
                            userTrainings: trainings,
                        })
                    }
                })
            }
        }
    }
    

    // Edits the user based on the changes in the checkboxes 
    handleChange(training) {
        let er = false;
        var trainings = this.state.userTrainings;
        let authID = parseInt(this.state.authID); // undefined if not a string -> int value
        if (!authID) { // convert email to id if its not an id
           
            axios(getUserEmail(this.state.authID))
                .then((response, error) => {
                    if (error) {
                        er=true;
                        console.log("Error getting authID");
                    }
                    else {
                        
                        authID = response.data.id;
                    }
                }).catch((err) => {
                    er=true;
                    this.handleFindUser();
                })
            }
            if (!er) {
                axios(editUser(this.state.idINT, { [training[0]]: !training[1] }, authID, this.state.authPassword))
                    .then((response, error) => {
                        if (error) {
                            console.log('Error editing user !');
                            this.handleFindUser();
                        } else {
                            console.log('Edited successfully!');
                            this.setState({
                                userTrainings: (trainings[trainings.indexOf(training)])[1] = !training[1],
                            })
                            
                        }
                    })
                    .catch((err) => {
                        this.handleFindUser();
                    })
            }
            console.log(this.state.userTrainings);
    }

    handleCreatePassword() {
        let authID = parseInt(this.state.authID);
        let er = false;
        if (!this.state.hasPassword) {
            if (this.state.createdPassword) {
                if (!authID) {
                    er = true;
                    axios(getUserEmail(this.state.authID))
                    .then((response, error) => {
                        if (error) {
                            console.log("Error getting authID");
                        }
                        else {
                            authID = response.data.id;
                            er = false;
                        }})  
                } 
                if (!er) {  // if no error in case the email was called first
                axios(editUser(this.state.idINT, {"password":this.state.createdPassword}, authID, this.state.authPassword))
                    .then((response, error) => {
                        if (error) {
                            console.log('Error creating password');
                            this.handleFindUser();
                        } else {
                            console.log('Set password.');
                            this.setState({
                                createdPassword: '',
                                hasPassword: true,
                            });
                        }
                        })
                        .catch((err) => {
                            this.handleFindUser();
                        })
                }
            }
        } else { // the edit password button was clicked, and this will make the create password box appear
            this.setState({
                hasPassword: false,
            })
        }
    }

    toggleFabTech() {
        let er = false;
        console.log(this.state.authID);
        let authID = parseInt(this.state.authID);
        if (!authID) { // convert email to id if its not an id
            er = true;
            axios(getUserEmail(this.state.authID))
                .then((response, error) => {
                    if (error) {
                        console.log("Error getting authID");
                    }
                    else {
                        er = false;
                        authID = response.data.id;
                    }
                })
            }
            if (!er) {  // if no error in case the email was called first
                axios(editUser(parseInt(this.state.id), { "fabTech": !this.state.userIsFabTech }, authID, this.state.authPassword)).then((response, error) => {
                    if (error) {
                        console.log('Error making user FabTech!');
                    } else {
                        console.log('Edited FabTech !');
                        this.setState((currentState) => {
                            return {
                                userIsFabTech: !currentState.userIsFabTech,
                            }
                        })
                    }
                })
            }
    }
    // Receives input from the <Inputs />
    handleCallBack(variable, value) {
        this.setState({
            [variable]: value,
        })
    }

    render() {
        if (this.state.isFabTech) {
            return (
                <div>
                    <div className="editUserContainer">
                        <h1 id="text3" align="left"> </h1>
                        <Inputs
                            className="BoxInput"
                            placeholder="Enter ID"
                            value={this.state.id}
                            variable="id"
                            parentCallBack={this.handleCallBack}
                        />
                        <button className="BetterButton" onClick={() => this.handleFindUser()}>Search</button>
                        <h1 id="text3" align="left">Name: {this.state.user.name}</h1>
                        <DisplayChecks
                            trainings={this.state.userTrainings}
                            handleChange={this.handleChange}
                            userIsFabTech={this.state.userIsFabTech}
                            isAdmin={this.state.isAdmin}
                            toggleFabTech={this.toggleFabTech}
                        />
                        <EditPassword 
                            userIsFabTech={this.state.userIsFabTech}
                            hasPassword={this.state.hasPassword}
                            createdPassword={this.state.createdPassword}
                            handleCreatePassword={this.handleCreatePassword}
                            handleCallBack={this.handleCallBack}
                        />
                        <ConditionalButton
                            trainings={this.state.userTrainings}
                        />
                    </div>
                    <div className="container">
                        <div>
                            <Inputs
                                className="BoxInput"
                                id='small-input'
                                placeholder="Enter Auth ID"
                                value={this.state.authID}
                                variable="authID"
                                parentCallBack={this.handleCallBack}
                            />
                        </div>
                        <div>
                            <Inputs
                                className="BoxInput"
                                id="small-input2"
                                type="password"
                                placeholder="Enter Password"
                                value={this.state.authPassword}
                                variable="authPassword"
                                parentCallBack={this.handleCallBack}
                            />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <Inputs
                        className="BoxInput"
                        placeholder="FabTech ID"
                        value={this.state.fabTechID}
                        variable="fabTechID"
                        parentCallBack={this.handleCallBack}
                    />
                    <button className="BetterButton" onClick={() => this.handleFabTechCheck()}>Submit</button>
                </div>
            )
        }
    }
}