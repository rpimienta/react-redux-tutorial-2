import React, { Component } from 'react';

import Users from './users/Users.js';
import Clock from './utils/Clock.js';
import Vanilla from './utils/Vanilla.js';

import ValidationForm from './form/Validation.js';
import ControlForm from './form/ControlForm.js';
import CartList from './form/CartList.js';

// import ExpectTest from './redux/ExpectTest.js';
import Redux from './redux/Redux.js';
import CombineReducers from './redux/CombineReducers';
// import TodoList from './form/TodoList.js';

import './App.css';

class App extends Component {

  render() {
    const mainStyle = {
      display: 'flex',
      justifyContent: 'center'
    } 
    const vInner = {
      position: 'absolute',
      width: '50%',
      height: '50%',
      top: '25%',
      left: '25%',
      background: 'white'
    }
    return (
      <div className="App" >
        <h1>React + Redux Training</h1>
        <div style={mainStyle}>
          <Users title='Users List'/>
          <Clock/>
          <Vanilla>
            <div style={vInner}>Vanilla-tilt.js</div>
          </Vanilla>
          <ValidationForm/>
        </div>
        <div style={mainStyle}>
          <ControlForm/>
          <CartList/>
        </div>
        <div style={mainStyle}>
          { /*<ExpectTest/> */}
          <Redux/>
          <CombineReducers/>
        </div>
        <div style={mainStyle}>
        
        </div>
      </div>
    );
  }
}

export default App;
