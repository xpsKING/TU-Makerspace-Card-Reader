import axios from 'axios';
import React from 'react';
import './EditUser.css';
import {getUser} from './APIRoutes.js';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';
import { CheckBox } from '@material-ui/icons';


function DisplayChecks(props) {
    return (
        <div>
            {(props.trainings).map((training) => (
                <h1 key={training[0]}> 
                    
                    <CheckBox
                    inputprops={training[0]}
                    defaultChecked
                    size="small"
                    />

                    
                </h1>
            ))}

        </div>
    )
}

export default class EditUser2 extends React.Component {
    constructor(props) {
        super(props);

        this.state=({
            id: '',
            user: {},
            trainings: [],
        })
  
    }

    handleUpdateID(e) {
        const value = e.target.value;
        this.setState({
            id: value,
        })

    }
    handleFindUser() {
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
                    trainings: trainings,
                })
            } 
        })
    }
    handleChange(training) {
        let trainings = this.state.trainings;
        trainings.map((train) => {
            if (train === training) {
                train[1] = !train[1];
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Name: {this.state.user.name}</h1>
            <input
                className="BoxInput"
                placeholder="Enter ID"
                value = {this.state.id}
                onChange={(e) => this.handleUpdateID(e)}
                />
            <button onClick={() => this.handleFindUser()}>Submit</button>
            <DisplayChecks 
                trainings = {this.state.trainings || {}}
                handleChange={this.handleChange}
            />
            </div>

        )
    }
}