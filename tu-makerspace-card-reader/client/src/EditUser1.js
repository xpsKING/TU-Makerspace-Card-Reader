import './EditUser.css';
import React from 'react';
import axios from "axios";
import {getFabTechs} from './APIRoutes.js';
import {Navigate} from 'react-router';



export default class EditUser1 extends React.Component {
    constructor(props) {
        super(props);

        this.state=({
            id: '',
            isFabTech: false,
        })
    }

    handleFabTechCheck() {
        const id = parseInt(this.state.id);
        console.log('isFabTechRunning: ' + id);
        var users = [];
        axios(getFabTechs()).then((response, error) => {
            if (error) {
                console.log('Problem retrieving users...');
            } else {
                response.data.map((user) => console.log(user.id));
                users = response.data;
                if (users.some((user) => user.id === id)) {
                    this.setState({
                        isFabTech: true,
                    })
                } 
               this.setState({
                   id: '',
               })
            }
        })
    }
    handleUpdateID(e) {
        const value = e.target.value;
        this.setState({
            id: value,
        })
    }

    render() {
        if (this.state.isFabTech) {
            return <Navigate to="/editUser2"/>
        }
        return (
            <div>
            <input
                className="BoxInput"
                value={this.state.id}
                placeholder="FabTech ID"
                onChange={(e) => this.handleUpdateID(e)}
            />
            <button className="BetterButton" onClick={() => this.handleFabTechCheck()}>Submit</button>
            </div>
        )
    }
}

