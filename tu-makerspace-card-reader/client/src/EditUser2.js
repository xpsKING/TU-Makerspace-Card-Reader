import axios from 'axios';
import React from 'react';
import './EditUser.css';
import {getUser, editUser} from './APIRoutes.js';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
//import { CheckBox } from '@material-ui/icons';

// if admin makes someone fabtech, they must set a password

function DisplayChecks(props) {
    return (
        <div className="check">
            {(props.trainings).map((training) => (
                <h1 key = {training} > 
                <FormControlLabel 
                    label = {training[0]}
                    control = {
                    <Checkbox
                    color="primary"
                    inputprops={training}
                    checked={training[1]}
                    size="medium"
                    onChange={() => props.handleChange(training)}
                    />
                    }
                    />
                </h1>
            ))}

        </div>
    )
}


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

        this.state=({
            id: '',
            authID: '',
            authPassword: '',
            user: {},
            userTrainings: [],
        })
        
        this.handleChange = this.handleChange.bind(this);
    }

    handleUpdateID(e) {
        const value = e.target.value;
        this.setState({
            id: value,
        })

    }
    handleUpdateauthID(e) {
        const value = e.target.value;
        this.setState({
            authID: value,
        })
    }
    handleUpdateAuthPassword(e) {
        const value = e.target.value;
        this.setState({
            authPassword: value,
        })
    }
    handleFindUser() {
        console.log(this.state.id);
        if (this.state.id) {
            const id = parseInt(this.state.id);
            var trainings;
            axios(getUser(id)).then((response, error) => {
                if (error) {
                    console.log('Error finding User');
                } else {
                    console.log(response.data);
                    this.setState({
                        user: response.data,
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

    handleChange(training) {
        let errorLater = false;
        var trainings = this.state.userTrainings;
        const changeTrainings = trainings.map((train) => {
                if (train === training) {
                    axios(editUser(parseInt(this.state.id), {[train[0]]:!train[1]}, parseInt(this.state.authID), this.state.authPassword)).then((response, error) => {
                        if (error) {
                            errorLater = true;
                            console.log('Error editing user !');
                        } else {
                            console.log('Edited successfully!');
                        }
                    })
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


    render() {
        return (
            <div>
                <h1 id="text">Name: {this.state.user.name}</h1>
            <input
                className="BoxInput"
                placeholder="Enter ID"
                value = {this.state.id}
                onChange={(e) => this.handleUpdateID(e)}
                />
            <button className = "BetterButton" onClick={() => this.handleFindUser()}>Submit</button>
            <div className="container">
            <input 
                className="BoxInput"
                id="small-input"
                placeholder="Enter Auth ID"
                value = {this.state.authID}
                onChange={(e) => this.handleUpdateauthID(e)}
            />
            <input 
                className="BoxInput"
                id="small-input2"
                type="password"
                placeholder="Enter password"
                value={this.state.authPassword}
                onChange={(e) => this.handleUpdateAuthPassword(e)}
            />
            </div>
            <DisplayChecks
            
            trainings = {this.state.userTrainings}
            handleChange={this.handleChange}
            />
            <ConditionalButton 
                trainings={this.state.userTrainings}
            />
            </div>

        )
    }
}