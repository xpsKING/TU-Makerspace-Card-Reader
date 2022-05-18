import './App.css';
import mill from './mill.png';
import bandsaw from './bandsaw.jpeg';
import tempimage from './tempimage.png';
import axios from 'axios';
import SwitchUnstyled from '@mui/base/SwitchUnstyled';
import React from 'react';
import { getUser, disableMachine, toggleMachine, getAllMachines } from './APIRoutes';
import Root from './switchtheme.js'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      $error: false,// added $ before boolean
      currentUser:{
        "name":"Enter ID",
        "nullTraining":false,
      },
      machineGroup: props.machineGroup,
      machines: [{
        "name":"loading",
        "id":0, 
        "status":false, 
        "requiredTraining":"nullTraining",
      }], //temporary "loading" machine that gets overirdden in componentdidmount()
    };
  }
  componentDidMount(){ //gets called when component starts, gets machines for specific machinegroup from api
    axios(getAllMachines(this.state.machineGroup)).then((response, error) => {
      if(error){
        console.log("error getting machines");
      }
      else{
        console.log(response.data);
        this.setState({
          machines: []
        })
        this.setState({
          machines : response.data,
          currentUser:{
            "name":"Enter ID",
            "nullTraining":false},
        });
      }
    });

  }
  handlenewSearch = (event)=>{ //called when search box is changed. updates user which is referenced by Machine component for perms
    
    const value = event.target.value;
    this.setState({
      value: value,
    })
    if (value !== '') { // added this to unset error
      axios(getUser(event.target.value)).then((response, err) => {
        console.log(response.data);
        if (response.data.name) {
          console.log("name set: " + response.data.name);
          this.setState({
            currentUser : response.data, 
            $error: false,
          }); 
          //currentUser is set in state of search, need to build function to check user perms and apply to machines as they are mapped
        }
        else {
          console.log("error fetching name: " + err);
          this.setState({
            $error: true,
            currentUser:{"name":"Enter ID","nullTraining":false},
          });
          
        }
      }).catch((err)=>{
        console.log("error fetching name: " + err);
        this.setState({
          $error: true,
          currentUser:{"name":"Enter ID","nullTraining":false},
        });
      });
    } else { // unsets error when empty
      this.setState({
        error: false,
        currentUser:{
          "name":"Enter ID",
          "nullTraining":false,
        },
      })
    }
  
  }
  
  handleLogOut() {
    this.setState({
      value: '',
      $error: false,
      currentUser:{
        "name":"Enter ID",
        "nullTraining":false,
      },
    })
  }
  
  render() {
    let err = this.state.$error;
    return (
    
      <div className='SearchWindow' align = "left">
        
        {/* Create textfield for user input, highlights red if error! Blue if valid name! */}
        <h3 id = "otherh3">Name: {this.state.currentUser.name !== "Enter ID" ? this.state.currentUser.name : ' '}</h3>
        
        <input 
          id = {err === true ? "input2true" : "input2false"}
          className = 'BetterTextField'
          placeholder={this.state.currentUser.name}
          $error = {this.state.error}
          value={this.state.value} 
          onChange={this.handlenewSearch} 
          autoComplete = "off"
          /> 
          <button 
            className = "BetterBox" 
            onClick={() => this.handleLogOut()} 
            > Log Out </button>
        
        
        {/* Creates multiple machines from the machine[] state! Machine state is filled on component load and is called via api GET machines/group/groupname */}
        {/* Change the machinegroup prop when you render the search component to set which tablet this is run on  */}
        <div className='container'>
          {this.state.machines.map((machine)=>(
            <Machine
              machineID = {machine.id}
              machineName={machine.name} 
              currentUser={this.state.currentUser} 
              activated={machine.status} 
              trained ={this.state.currentUser[machine.requiredTraining]}
              test={console.log('test ' + machine.id)}
            />
          ))}
          {this.state.machines.map((machine) => {
            console.log('MACHINE IDS TEST: ' + machine.id);
          })}
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
      activated: props.activated,
      currentUser:props.currentUser,
      image: this.getImage(props.machineName, props.machineID),
      trained: props.trained,
      
    };
  }

 //used to determine which image to grab for machine diplay. may move this to its own file later to clean up code.
  getImage(machineName, machineID){
    //console.log(machineName + " " + machineID);
    if(machineName === "CNC Mill"){
      return mill;
    }
    else if (machineName === 'Bandsaw') {
      return bandsaw;
    }
    else{
      return tempimage;
    }
    
  }

 //used to update buttons with perms on user change. does not change activated state on machine, so remote disable is not supported atm. to be supported if deemed needed.
  static getDerivedStateFromProps(props, state){
    console.log("called cool");
    state={
      currentUser:props.currentUser,
      currentUser:props.currentUser,
      trained:props.trained
    };
    return state
  }
  //called when button is clicked, changes state and calls api to database
  onButtonChange = () => {
    console.log('changed');
    if (this.state.activated) {
      this.setState({activated:false});
      disableMachine(this.state.machineID); //this doesnt work yet, to be implemented, so that database updates with button change
     
    }
    else {
      toggleMachine(this.state.machineID, this.state.currentUser);//same here
      this.setState((currentState) => {
        return {activated:!currentState.activated}}); 
      //console.log('enabled ' + this.state.machineName);
      //console.log('key: ' + this.state.machineID);
    }
  }

  render() {
    return (
      <span>
   
        <img src={this.state.image} className = {this.state.activated === true ? "MachineBoxTrue" : "MachineBox"} />
        <ul id = "p2">
        <span id="otherh3-2">{this.state.machineName}</span>
        <SwitchUnstyled
          component={Root} 
          id = "switch"
          className = "toggle"
          checked={this.state.activated} 
          size="medium" 
          color="success" 
          disabled={!this.state.trained && !this.state.activated} 
          inputprops={{ 'aria-label': 'Switch A' }}
          onChange={(event)=>this.onButtonChange(event)}
    />
      {/*  <input
          value = {machineID}
          type="checkbox"
          id="switch"
          className="checkbox"
          test = {console.log('hi')/*}disabled={!this.state.trained && !this.state.activated}
          checked={this.state.activated} {}
          onChange={this.onButtonChange}
          />
          <label htmlFor="switch" className="toggle">
          </label> {*/}
          </ul>
        
         {/*} 
        <Switch 
          id = "switch"
          checked={this.state.activated} 
          size="medium" 
          color="error" 
          disabled={!this.state.trained && !this.state.activated} 
          inputProps={{ 'aria-label': 'Switch A' }}
          onChange={(event)=>this.onButtonChange(event)}
    />{*/}
      </span>

    );
    }
}




function App() {
  return (
    <Search machineGroup="metalShop1"/>
  );
}

export default App;


