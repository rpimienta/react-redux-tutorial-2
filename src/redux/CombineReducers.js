import React, {Component} from 'react';
import { createStore, combineReducers } from 'redux';

class CombineReducers extends Component{
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
        <h1>Combining Reducers</h1>
        <h2>(see console...)</h2>
      </div>
    )
  }
}

// ---- Todos example

// Todo Reducer
const todo = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return{
        id: action.id,
        text:action.text,
        completed:false
      }
    case 'TOGGLE_TODO':
      if(state.id !== action.id){
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      }
    default: 
      return state;
  }
}
// Todos Reducer
const todos = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [ 
        ...state,
        todo(undefined,action)
      ];
    case 'TOGGLE_TODO':
      return state.map( t => { return todo(t, action)})
    default: 
      return state;
  }
}

// Visibility Filter
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default: return state;
  }

}
// TodoApp Reducer
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(
//       state.todos,
//       action
//     ),
//     visibilityFilter: visibilityFilter(
//       state.visibilityFilter,
//       action
//     )
//   };
// }
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});
const store = createStore(todoApp);
console.log('Initial state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO:');
store.dispatch({
  type:'ADD_TODO',
  id:0,
  text:'Learn React'
})
console.log('Current state:');
console.log(store.getState());

console.log('--------------');

console.log('Dispatching ADD_TODO:');
store.dispatch({
  type:'ADD_TODO',
  id:1,
  text:'Learn Redux'
})
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO:');
store.dispatch({
  type:'ADD_TODO',
  id:2,
  text:'Forget Everything'
})
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching TOGGLE_TODO:');
store.dispatch({
  type:'TOGGLE_TODO',
  id:2
})
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO store 2:');
store.dispatch({
  type:'ADD_TODO',
  id:3,
  text:'Re-learn Everything'
})
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching ADD_TODO store 2:');
store.dispatch({
  type:'ADD_TODO',
  id:4,
  text:'Not cry'
})
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

console.log('Dispatching TOGGLE_TODO for store 2:');
store.dispatch({
  type:'TOGGLE_TODO',
  id:3
})
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

store.dispatch({
  type:'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

export default CombineReducers;