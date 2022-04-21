import './App.css';
import mill from './mill.png';
import tempimage from './tempimage.png';
import axios from 'axios';
import { Switch, TextField } from '@mui/material/';
import React from 'react';
import { getUser, disableMachine, toggleMachine, getAllMachines } from './APIRoutes';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      error: false,
      currentUser:{"name":"Enter ID","nullTraining":false},
      machineGroup: props.machineGroup,
      machines: [{"name":"loading","id":0, "status":false, "requiredTraining":"nullTraining"}] //temporary "loading" machine that gets overirdden in componentdidmount()
    };
  }
  componentDidMount(){ //gets called when component starts, gets machines for specific machinegroup from api
    axios(getAllMachines(this.state.machineGroup)).then((response, error) =>{
      if(error){
        console.log("error getting machines");
      }
      else{
        console.log(response.data);
        this.setState({
          machines : response.data,
          currentUser:{"name":"Enter ID","nullTraining":false},

        });
      }
    });

  }
  handlenewSearch = (event)=>{ //called when search box is changed. updates user which is referenced by Machine component for perms
    axios(getUser(event.target.value)).then((response, error) => {
      console.log(response.data);
      if (response.data.name) {
        console.log("name set: " +response.data.name);
        this.setState({currentUser : response.data, error: false}); 
      
        //currentUser is set in state of search, need to build function to check user perms and apply to machines as they are mapped
      }
      else {
        console.log("error fetching name: " +error);
        this.setState({
          error: true,
          currentUser:{"name":"Enter ID","nullTraining":false},
        });
        
      }
    }).catch((error)=>{
      console.log("error fetching name: " +error);
      this.setState({
        error: true,
        currentUser:{"name":"Enter ID","nullTraining":false},
      });
    });
  
  }
  
  render() {
    return (
      <div className='SearchWindow'>

        {/* Create textfield for user input, highlights red if error! Blue if valid name! */}
        <TextField id="filled-basic" label={this.state.currentUser.name} variant="filled" error={this.state.error} value={this.state.value} onChange={this.handlenewSearch}  /> 
        
        {/* Creates multiple machines from the machine[] state! Machine state is filled on component load and is called via api GET machines/group/groupname */}
        {/* Change the machinegroup prop when you render the search component to set which tablet this is run on  */}
        <div className='Machine map'>
          {this.state.machines.map(machine=>(
            <Machine key={machine.id} machineName={machine.name} currentUser={this.state.currentUser} activated={machine.status} trained ={this.state.currentUser[machine.requiredTraining]}/>
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
      machineName: props.machineName,
      activated: props.activated,
      currentUser:props.currentUser,
      image: this.getImage(props.machineName),
      trained: props.trained
    };
  }

 //used to determine which image to grab for machine diplay. may move this to its own file later to clean up code.
  getImage(machineName){
    console.log("machine name: " +machineName)
   if(machineName =="CNC Mill"){
     return mill
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
  onButtonChange = (event) => {
    if (this.state.activated && !event.target.checked) {
      this.setState({activated:false});
      disableMachine(this.machineID); //this doesnt work yet, to be implemented, so that database updates with button change
    }
    else {
      toggleMachine(this.machineID, this.state.currentUser);//same here
      this.setState({activated:event.target.checked}); 
    }
  }

  render() {
    return (
      <div>
        <img src={this.state.image}  width={100}/>
        <Switch checked={this.state.activated} size="medium" color="error" disabled={!this.state.trained && !this.state.activated} inputProps={{ 'aria-label': 'Switch A' }}
          onChange={(event)=>this.onButtonChange(event)}
        />
      </div>

    );
  }
}




function App() {
  return (
    <Search machineGroup="metalShop1"/>
  );
}

export default App;
