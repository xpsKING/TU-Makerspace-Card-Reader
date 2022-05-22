import axios from 'axios';
import React from 'react';
import './EditUser.css';
import { getUser, editUser, getFabTechs, getUserEmail } from './APIRoutes.js';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import Inputs from './Inputs.js';
import Typography from '@mui/material/Typography';
//import { CheckBox } from '@material-ui/icons';

// if admin makes someone fabtech, they must set a password

// displays the checkboxes based on the trainings
function DisplayChecks(props) {
    return (
        <div className="containerChecks">
            {(props.trainings).map((training) => (
                <div className="containerChecks">
                    <h1 key={training}>
                        <FormControlLabel

                            classes="checks"
                            label={<Typography id="text2" variant="body2" color="textSecondary">{training[0]}</Typography>}
                            control={
                                <Checkbox
                                    color="success"
                                    inputprops={training}
                                    checked={training[1]}
                                    size="medium"
                                    onChange={() => props.handleChange(training)}
                                />
                            }
                        />
                    </h1>
                </div>
            ))}

            <FabTechToggle
                isAdmin={props.isAdmin}
                userIsFabTech={props.userIsFabTech}
                handleChange={props.handleChange}
                trainings={props.trainings}
                toggleFabTech={props.toggleFabTech}
            />

        </div>
    )
}



function FabTechToggle(props) {
    console.log('fabtechtoggle' + props.isAdmin);
    if (props.isAdmin && props.trainings.length !== 0) {
        return (
            <div>
                <FormControlLabel
                    label={<Typography id="text2" variant="body2" color="textSecondary">Fab Tech</Typography>}
                    control={
                        <Checkbox
                            color="secondary"
                            checked={props.userIsFabTech}
                            size="medium"
                            onChange={() => props.toggleFabTech()}
                        />
                    }
                />
            </div>
        )
    } else {
        return null;
    }
}

// only displays the done button if a user was found
function ConditionalButton(props) {
    if (props.trainings.length !== 0) {
        return (
            <form action="/">
                <button className="BetterButton" id="submitAll">Done</button>
            </form>
        )
    } else {
        return null;
    }
}

export default class EditUser2 extends React.Component {
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
        })

        this.handleChange = this.handleChange.bind(this);
        this.handleCallBack = this.handleCallBack.bind(this);
        this.toggleFabTech = this.toggleFabTech.bind(this);
    }
    // only allows a valid FabTech ID to access the editing page
    // may later remove the input of a fabtech ID on the editing page and only require password (Note from bennett: instead of removing it we should just autofill)
    handleFabTechCheck() {
        const id = parseInt(this.state.fabTechID);

        console.log('isFabTechRunning: ' + id);
        var users = [];
        if (!id) { //if id is a tulane login instead:
            axios(getUserEmail(this.state.fabTechID))
                .then((response, error) => {
                    if (error) {
                        console.log('Problem retrieving users...');
                    }
                    else {
                        if (response.data.fabTech || response.data.admin) {
                            this.setState({
                                isFabTech: response.data.fabTech,
                                isAdmin: response.data.admin
                            })
                        }
                        else {
                            console.log("not a fabtech/admin!");
                        }
                    }
                })
        } else { //if id is an id.
            axios(getUser(id))
                .then((response, error) => {
                    if (error) {
                        console.log('Problem retrieving users...');
                    }
                    else {
                        if (response.data.fabTech || response.data.admin) {
                            this.setState({
                                isFabTech: response.data.fabTech,
                                isAdmin: response.data.admin
                            })
                        }
                        else {
                            console.log("not a fabtech/admin!");
                        }
                    }
                })
        }
    }
    // finds the user to display
    handleFindUser() {
        console.log(this.state.id);
        if (this.state.id) {
            const id = parseInt(this.state.id);
            var trainings;

            if (id) { // if id is an id (opposed to an email)
                axios(getUser(id)).then((response, error) => {
                    if (error) {
                        console.log('Error finding User');
                    } else {
                        console.log(response.data);
                        this.setState({
                            user: response.data,
                            idINT:id
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
            else{ //if id is not a number, instead user entered an email
                axios(getUserEmail(this.state.id))
                .then((response,error)=>{
                    if (error) {
                        console.log('Error finding User');
                    } else {
                        console.log(response.data);
                        this.setState({
                            user: response.data,
                            idINT: response.data.id
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
        let errorLater = false;
        var trainings = this.state.userTrainings;
        let authID = parseInt(this.state.authID);
        if(!authID){//convert email to id if its not an id
            axios(getUserEmail(this.state.authID))
            .then((response, error)=>{
                if (error){
                    console.log("Error getting authID");
                }
                else{
                    authID = response.data.id;
                    const changeTrainings =trainings.map((train) => {
                        if (train === training) {
                            console.log(this.state.idINT);
                            axios(editUser(this.state.idINT, { [train[0]]: !train[1] }, authID, this.state.authPassword))
                                .then((response, error) => {
                                if (error) {
                                    errorLater = true;
                                    console.log('Error editing user !');
                                    this.handleFindUser();
                                } else {
                                    console.log('Edited successfully!');
                                }
                            })
                            .catch((err)=>{
                                this.handleFindUser();
                            })
                            if (train === training)
                                return [train[0], !train[1]];
                        } else {
                            return train;
                        }
                    })
            
                    if (!errorLater) {
                        this.setState({
                            userTrainings: changeTrainings,
                        })
                    }
                }
            })
        }
        else{ //authid is a number
            const changeTrainings = trainings.map((train) => {
                if (train === training) {
                    axios(editUser(this.state.idINT, { [train[0]]: !train[1] }, parseInt(this.state.authID), this.state.authPassword))
                    .then((response, error) => {
                        if (error) {
                            errorLater = true;
                            console.log('Error editing user !');
                            this.handleFindUser();
                        } else {
                            console.log('Edited successfully!');
                            
                        }
                    })
                    .catch((err)=>{
                        errorLater = true;
                        this.handleFindUser();
                    })
                    if (train === training)
                        return [train[0], !train[1]];
                } else {
                    return train;
                }
            })
    
            if (!errorLater) {
                this.setState({
                    userTrainings: changeTrainings,
                })
            }
            
        }
        

    }
    toggleFabTech() {
        console.log(this.state.authID);
            let authID = parseInt(this.state.authID);
                if(!authID){//convert email to id if its not an id
                    axios(getUserEmail(this.state.authID))
                    .then((response, error)=>{
                        if (error){
                            console.log("Error getting authID");
                        }
                        else{
                             authID = response.data.id;
                             axios(editUser(parseInt(this.state.id), { "fabTech": !this.state.userIsFabTech }, authID, this.state.authPassword)).then((response, error) => {
                                if (error) {
                                    console.log('Error making user FabTech!');
                                } else {
                                    console.log('Edited FabTech !');
                                    this.setState((currentState) => {
                                        console.log("FABTECHHHH");
                                        return {
                                            userIsFabTech: !currentState.userIsFabTech,
                                        }
                                    })
                                }
                            })
                        }
                    })
                }else{
                    axios(editUser(parseInt(this.state.id), { "fabTech": !this.state.userIsFabTech }, authID, this.state.authPassword)).then((response, error) => {
                        if (error) {
                            console.log('Error making user FabTech!');
                        } else {
                            console.log('Edited FabTech !');
                            this.setState((currentState) => {
                                //console.log("FABTECHHHH");
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
        console.log(this.state);
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
