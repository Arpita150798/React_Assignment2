import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link , Switch} from 'react-router-dom';
import LoginForm from './components/login';
import Routes from './components/Routes';

function App() {
  return (
    <div className="App">
        <Routes />
    </div>
  );
}

export default App;
