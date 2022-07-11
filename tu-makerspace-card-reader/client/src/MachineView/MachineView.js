import './machineView.css';
import axios from 'axios';
import React from 'react';
import { getUser, disableMachine, toggleMachine, getAllMachines, editMachine } from '../APIRoutes';
import { TagOutButton, TagOutInformation } from './TagOut.js';
import getImage from './GetImage.js';


export default class MachineView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFabTech: false,
      fabTechView: false,
      value: '',
      error: false,// added $ before boolean
      currentUser: {
        "name": "Enter ID",
        "nullTraining": false,
      },
      machineGroup: props.machineGroup,
      machines: [{
        "name": "loading",
        "id": 0,
        "status": false,
        "requiredTraining": "nullTraining",
      }], //temporary "loading" machine that gets overirdden in componentdidmount()
    };

    this.toggleFabTechView = this.toggleFabTechView.bind(this);
  }
  componentDidMount() { //gets called when component starts, gets machines for specific machinegroup from api
    axios(getAllMachines(this.state.machineGroup)).then((response, err) => {
      if (err) {
        console.log("error getting machines");
      }
      else {
        // console.log(response.data);
        this.setState({
          machines: []
        })
        this.setState({
          machines: response.data,
          currentUser: {
            "name": "Enter ID",
            "nullTraining": false
          },
        });
        this.disableMachines();
      }
    });

  }
  disableMachines() {
    this.state.machines.forEach((machine) => {
      if (!machine.activated) {
        axios(disableMachine(machine.id))
          .then((response, error) => {
            if (error) {
              console.log("ERROR");
            } else {
              console.log('Machine Disabled');
            }
          }).catch((err) => {
            console.log(err);
          });
        }})
}
handlenewSearch = (event) => { //called when search box is changed. updates user which is referenced by Machine component for perms

  const value = event.target.value;
  this.setState({
    value: value,
  })
  if (value !== '') { // added this to unset error
    axios(getUser(parseInt(event.target.value, 16))).then((response, err) => {
      // console.log(response.data);
      if (response.data.name) {
        console.log("name set: " + response.data.name);
        this.setState({
          currentUser: response.data,
          error: false,
          isFabTech: response.data.fabTech,
          fabTechView: false,
        });
        //currentUser is set in state of search, need to build function to check user perms and apply to machines as they are mapped
      }
      else {
        console.log("error fetching name: " + err);
        this.setState({
          error: true,
          currentUser: {
            "name": "Enter ID",
            "nullTraining": false,
          },
        });

      }
    }).catch((err) => {
      console.log("error fetching name: " + err);
      this.setState({
        error: true,
        currentUser: {
          "name": "Enter ID",
          "nullTraining": false
        },
      });
    });
  } else { // unsets error when empty
    this.setState({
      error: false,
      currentUser: {
        "name": "Enter ID",
        "nullTraining": false,
      },
      isFabTech: false,
      fabTechView: false,
    })
  }

}

handleLogOut() {
  this.setState({
    isFabTech: false,
    fabTechView: false,
    value: '',
    error: false,
    currentUser: {
      "name": "Enter ID",
      "nullTraining": false,
    },
  })
}
toggleFabTechView() {
  this.setState((currentState) => {
    return {
      fabTechView: !currentState.fabTechView,
    }
  })

}


render() {
  let err = this.state.error;
  return (

    <div>
      <div id="adminToggle">
        <TagOutButton
          isFabTech={this.state.isFabTech}
          fabTechView={this.state.fabTechView}
          toggleFabTechView={this.toggleFabTechView}
        />
      </div>
      <div className='login-container' align="left">
        {/* Create textfield for user input, highlights red if error! Blue if valid name! */}
        <h3 id="otherh3">Name: {this.state.currentUser.name !== "Enter ID" ? this.state.currentUser.name : ' '}</h3>

        <input
          id={err === true ? "input2true" : "input2false"}
          className='BetterTextField'
          placeholder={this.state.currentUser.name}
          error={this.state.error.toString()}
          value={this.state.value}
          onChange={this.handlenewSearch}
          autoComplete="off"
        />
        <button
          className="BetterBox"
          onClick={() => this.handleLogOut()}
        > Log Out </button>
      </div>

      {/* Creates multiple machines from the machine[] state! Machine state is filled on component load and is called via api GET machines/group/groupname */}
      {/* Change the machinegroup prop when you render the search component to set which tablet this is run on  */}
      <div className='container2'>
        {this.state.machines.map((machine) => (
          <Machine

            machineID={machine.id}
            machineName={machine.name}
            currentUser={this.state.currentUser}
            trained={this.state.currentUser[machine.requiredTraining]}
            taggedOut={machine.taggedOut}
            isFabTech={this.state.isFabTech}
            fabTechView={this.state.fabTechView}
            userID={this.state.currentUser.id}
            description={machine.description}
          />
        ))}

      </div>


    </div>

  )
}

}

class Machine extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      machineID: props.machineID,
      machineName: props.machineName,
      activated: false,
      currentUser: props.currentUser,
      image: getImage(props.machineName, props.machineID),
      trained: props.trained,
      fabTechView: props.fabTechView,
      taggedOut: props.taggedOut,
      userID: props.userID,
      tagOutMessageValue: '',
      tagOutMessage: props.description || '',
    };

    this.handleCallBack = this.handleCallBack.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.onButtonChange = this.onButtonChange.bind(this);
  }

  // used to update buttons with perms on user change. does not change activated state on machine, so remote disable is not supported atm. to be supported if deemed needed.
  static getDerivedStateFromProps(props, state) {
    state = {
      currentUser: props.currentUser,
      currentUser: props.currentUser,
      trained: props.trained,
      fabTechView: props.fabTechView,
      userID: props.userID,
    };
    return state
  }
  // called when button is clicked, changes state and calls api to database
  onButtonChange() {
    if (this.state.activated) {
      this.setState({ activated: false });
      axios(disableMachine(this.state.machineID));
    }
    else {
      axios(toggleMachine(this.state.machineID, this.state.currentUser.id))
        .then((res, err) => {
          if (err) {
            console.log("Error setting Machine State!");
          }
          if (res.data.message != "Insufficent Permission!") {
            this.setState({
              activated: !this.state.activated
            });
          }
          else {
            console.log("Insufficent Permission!");
          }
        })

      //console.log('enabled ' + this.state.machineName);
      //console.log('key: ' + this.state.machineID);
    }
  }
  handleToggleTagOut() {
    if (this.state.fabTechView) {
      axios(editMachine(this.state.machineID, { "taggedOut": !this.state.taggedOut, "description": '' }, this.state.userID))
        .then((response, error) => {
          if (error) {
            console.log('Error tagging in/out');
          } else {
            console.log('Success tagging in/out');
            this.setState((currentState) => {
              return {
                taggedOut: !currentState.taggedOut,
                activated: false,
                tagOutMessage: '',
              }
            })

          }
        }).catch((err) => {
          console.log(err);
        })
    }
  }

  // Receives input from the <Inputs />
  handleCallBack(variable, value) {
    this.setState({
      [variable]: value,
    })
  }

  submitMessage() {
    if (this.state.tagOutMessageValue) {
      axios(editMachine(this.state.machineID, { "description": this.state.tagOutMessageValue }, this.state.userID))
        .then((response, error) => {
          if (error) {
            console.log('Error editing machine description');
          } else {
            console.log('Successfully edited machine description');
            this.setState((currentState) => {
              return {
                tagOutMessage: currentState.tagOutMessageValue,
                tagOutMessageValue: '',
              }
            })
            console.log(this.state.tagOutMessageValue);
          }
        })
    }
  }

  render() {
    return (
      <div className="MachineBoxContainer" align="center">
        <span id="otherh3-2">{this.state.machineName}</span>
        <div className={this.state.activated ? "MachineBoxBorder" : 'MachineBoxBorder-false'}>
          <img src={this.state.image} className={this.state.activated ? "MachineBoxTrue" : "MachineBox"} />
          <button className={this.state.fabTechView ? "AdminToggle" : "AdminToggleFalse"} id={this.state.taggedOut ? "tagged-out-true" : "tagged-out-false"} onClick={() => this.handleToggleTagOut()} ></button>
        </div>
        <TagOutInformation
          fabTechView={this.state.fabTechView}
          taggedOut={this.state.taggedOut}
          tagOutMessageValue={this.state.tagOutMessageValue}
          tagOutMessage={this.state.tagOutMessage}
          machineName={this.state.machineName}
          activated={this.state.activated}
          trained={this.state.trained}
          submitMessage={this.submitMessage}
          handleCallBack={this.handleCallBack}
          onButtonChange={this.onButtonChange}
        />

      </div>

    );
  }
}
