import './App.css';
import MachineView from './MachineView.js';
import AddUser from './AddUser.js';
import { Routes, Route, Link } from 'react-router-dom';
import EditUser from './EditUser.js';
import { logo } from './images';
import Hamburger from  './hamburger.js';

function Home(){
  return(
    <>
      <main>
        <h2 className = "text">Welcome to the homepage!</h2>
        <p className="text">You can do this, I believe in you.</p>
      </main>
      <nav className="List">
        <form action="/metalShop1">
        <button className = "Box">metalShop1</button>
        </form>
        <form action="/addUser">
          <button className = "Box">Add a User</button>
        </form>
        <form action="/editUser">
          <button className="Box">Edit User</button>
        </form>
      </nav>
    </>
  )
}

function App() {
  return (
    <div className="App">
    
    <h1 className="header">
    <Hamburger />
    <form action="/" className = "form2">
      <button className="logo-button"></button>
      </form>
    <img src={logo} id="logo"/>
    
    
      Tulane Makerspace</h1>
    <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="metalShop1" element = {<MachineView machineGroup="metalShop1" />} />
      <Route path="metalShop2" element = {<MachineView machineGroup="metalShop2" />} />
      <Route path="woodShop" element = {<MachineView machineGroup="woodShop"/>} />
    {/* Maddie add a path for add user when u wanna start working on that and you now have a new page for that function! */}
      <Route path="addUser" element = {<AddUser />} />
      <Route path="editUser" element = {<EditUser />}/>
    </Routes>
    </div>
  );
}

export default App;


