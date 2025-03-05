import logo from './logo.svg';
import './App.css';
import ButtonOne from './components/button';
import PropTypes from 'prop-types'
import {useState ,useEffect} from 'react'
import X from './components/mainPage.js'
import MainPage from './components/mainPage.js';
import About from './components/About.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route exact path="/" element={<MainPage/>} />
      <Route exact path="/About" element={<About/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
