import './App.css';
import mill from './mill.png';
import Switch from '@mui/material/Switch';

function App() {
  return (
    <div className="App">
      <div>
      <img src={mill} alt="Mill" width={100} />
      </div>
      <div>
      <Switch value="checkedA" size="medium" color="error" inputProps={{ 'aria-label': 'Switch A' }} />
      </div>
      
      
    </div>
  );
}

export default App;
