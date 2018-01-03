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

const Todo = ({
  onClick,
  completed,
  text
}) =>( 
  <li 
    onClick={ onClick }
    style={{cursor:'pointer'}}
  >
    <p style={{textDecoration: completed? 'line-through': 'none'}}>{text}</p>
  </li>
)
const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map( todo => 
        <Todo
          key= {todo.id}
          {...todo}
          onClick = {() => onTodoClick(todo.id)}
        />
    )}
  </ul>
  );
class VisibleTodoList extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => 
      this.forceUpdate()
    );
  }
  componentWillUnmount () {
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const state = store.getState();
    return(
      <TodoList 
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={id => {
          store.dispatch({
            type:'TOGGLE_TODO',
            id
          })
        }}
      />
    );
  }
}

const AddTodo = () => {
  let input;
  return(
    <div>
      <input type="text" ref={ node => { input = node}}/>
        <button onClick={() => {
          store.dispatch({
            type:'ADD_TODO',
            id:nextId++,
            text:input.value
          })
          input.value = ''  
      }}>Add Todo</button>
    </div>
  );
};
const Link = ({active, onClick, children}) => {
  if(active){
    return <span>{children}</span>
  }
  return(
    <a href='#' 
      onClick={ (e)=>{
        e.preventDefault();
        onClick()
      }
    }>
      {children}
    </a>  
  );
}
class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => 
      this.forceUpdate()
    );
  }
  componentWillUnmount () {
    this.unsubscribe();
  }
  render() {
    const props = this.props;
    const state = store.getState();
    return(
      <Link 
        active={ props.filter === state.visibilityFilter }
        onClick={ () => 
          store.dispatch({
            type:'SET_VISIBILITY_FILTER',
            filter:props.filter
          })
        }
        children={props.children}
      />
    )
  }
}
const Footer = () => (
  <p> Show: 
    {' '} 
    <FilterLink
      filter='SHOW_ALL'
    >All</FilterLink>
    {' '} 
    <FilterLink
      filter='SHOW_ACTIVE'
    >Active</FilterLink>
    {' '} 
    <FilterLink
      filter='SHOW_COMPLETED'
    >Completed</FilterLink>
  </p>
)

const getVisibleTodos = ( todos , filter) => {
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
let nextId = 0;

const TodoApp = () =>
(
  <div style={{width:'52%',border: '1px solid',marginTop: '10px',padding: '20px',textAlign: 'left'}}>
    <h1>Todo List</h1>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

ReactDOM.render(<TodoApp />, document.getElementById('root'));
