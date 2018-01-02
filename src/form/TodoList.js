import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

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
  filter: 'SHOW_ALL'
});
console.log('Current state:');
console.log(store.getState());
console.log('--------------');

const FilterLink = ({filter, currentFilter, children}) => {
  if(currentFilter === filter){
    return <span>{children}</span>
  }
  return(
   <a href='#' 
    onClick={ (e)=>{
      e.preventDefault();
      store.dispatch({
        type:'SET_VISIBILITY_FILTER',
        filter
      })
      console.log('Visibility '+ store.getState().visibilityFilter)
    }
   }>
    {children}
  </a>  
  );
}
 const getVisibleTodos = ( todos , filter) => {
  console.log(filter);
  switch(filter){
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter( t => !t.completed);
    case 'SHOW_COMPLETED':
      return todos.filter( t => t.completed);
    default: return todos;
  }
 }
let nextId = store.getState().todos[store.getState().todos.length -1].id;
class TodoList extends Component{
  
  render(){
    const {todos, visibilityFilter} = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter)
    const mainForm = {
      width:'52%',
      border: '1px solid',
      marginTop: '10px',
      padding: '20px',
      textAlign: 'left'
    }
    return(
      <div style={mainForm}>
        <h1>Todo List</h1>
        <input type="text" ref={ node => { this.input = node}}/>
        <button onClick={() => { store.dispatch({
          type: 'ADD_TODO',
          id:++nextId,
          text: this.input.value
        }) 
        this.input.value = ''
      }}>Add Todo</button>
      <ul>
        {
          visibleTodos.map( todo => 
            <li key={todo.id}
              onClick={()=>{ store.dispatch({
                type:'TOGGLE_TODO',
                id: todo.id
              })}}
              style={{cursor:'pointer'}}
            >
              <p style={{textDecoration: todo.completed? 'line-through': 'none'}}>{todo.text}</p>
            </li>
          )
        }
      </ul>
      <p> Show: 
        {' '} 
        <FilterLink
          filter='SHOW_ALL'
          currentFilter = {visibilityFilter}
        >All</FilterLink>
        {' '} 
        <FilterLink
          filter='SHOW_ACTIVE'
          currentFilter = {visibilityFilter}
        >Active</FilterLink>
        {' '} 
        <FilterLink
          filter='SHOW_COMPLETED'
          currentFilter = {visibilityFilter}
        >Completed</FilterLink>
      </p>
      </div>
    )
  }
}


const render = () => {
  ReactDOM.render(<TodoList {...store.getState()} />, document.getElementById('root'));
}

store.subscribe(render);
render();
