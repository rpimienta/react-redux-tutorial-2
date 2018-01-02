import React, { Component } from 'react';
import { createStore } from 'redux';

//Reducer
const counter = (state = 0, action) => {
  if(action.type === 'INCREMENT'){
    return state + 1;
  }else if( action.type === 'DECREMENT'){
    return state - 1;
  }else{
    return state;
  }
}
const store = createStore(counter);//specify the reducer that tells how the state is updated with actions

class Redux extends Component{
  increment = ()=> {
    store.dispatch({ type: 'INCREMENT'});
    console.log(store.getState());
  }
  render(){
    const mainForm = {
      width:'32%',
      border: '1px solid',
      marginTop: '10px',
      padding: '20px',
      textAlign: 'left'
    }
    return(
      <div style={mainForm}>
        <h1>Redux</h1>
        <button onClick={this.increment}>Click Me!</button>
        <label>{store.getState()}</label>
      </div>
    )
  }
}
 



export default Redux;