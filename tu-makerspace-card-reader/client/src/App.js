import './App.css';
import MachineView from './MachineView.js';
import AddUser from './AddUser.js';
import { Routes, Route, Link } from 'react-router-dom';
import EditUser from './EditUser.js';
import ThemeTester from './ThemeTester';
import logo from './makerspacelogo.png';


function Home(){
  return(
    <>
      <main>
        <h2 className = "text">Welcome to the homepage!</h2>
        <p className="text">You can do this, I believe in you.</p>
      </main>
      <nav>
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
    <img src={logo} id="logo"/>
      Tulane Makerspace</h1>
    <Routes>
      <Route path= "/" element = {<Home />} />
      <Route path= "metalShop1" element = {<MachineView machineGroup="metalShop1" />} />
    {/* Maddie add a path for add user when u wanna start working on that and you now have a new page for that function! */}
      <Route path= "addUser" element = {<AddUser />} />
      <Route path="editUser" element = {<EditUser />}/>
      <Route path="themeTester" element = {<ThemeTester />}/>
    </Routes>
    </div>
  );
}

export default App;


