import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
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
const mapStateToTodoListProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
}
const mapDispatchToTodoListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    }
  };
}

const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

let AddTodo = ({dispatch}) => {
  let input;
  return(
    <div>
      <input type="text" ref={ node => { input = node}}/>
        <button onClick={() => {
          dispatch(addTodo(input.value))
          input.value = ''  
      }}>Add Todo</button>
    </div>
  );
};
AddTodo = connect(
  state => {
    return {}
  },
  dispatch => {
    return {dispatch};
  }
)(AddTodo);

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
const mapStateToLinkProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
const mapDispatchToLinkProps = (dispatch,ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  }
}

const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps)(Link);
// class FilterLink extends Component {
//   componentDidMount() {
//     const { store } = this.context;
//     this.unsubscribe = store.subscribe(() => 
//       this.forceUpdate()
//     );
//   }
//   componentWillUnmount () {
//     this.unsubscribe();
//   }
//   render() {
//     const props = this.props;
//     const { store } = this.context;
//     const state = store.getState();
//     return(
//       <Link 
//         active={ props.filter === state.visibilityFilter }
//         onClick={ () => 
//           store
//         }
//         children={props.children}
//       />
//     )
//   }
// }
// FilterLink.contextTypes = {
//   store : PropTypes.object
// }
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

const TodoApp = () =>
(
  <div style={{width:'52%',border: '1px solid',marginTop: '10px',padding: '20px',textAlign: 'left'}}>
    <h1>Todo List</h1>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});
// Actions Creators
let nextId = 0;
const addTodo = (text) => {
  return {
    type:'ADD_TODO',
    id:nextId++,
    text:text
  }
}
const setVisibilityFilter = (filter) => {
  return{
    type:'SET_VISIBILITY_FILTER',
    filter:filter
  }
}
const toggleTodo = (id) => {
  return {
    type:'TOGGLE_TODO',
    id
  };
};
// class Provider extends Component{
//   getChildContext () {
//     return {
//       store: this.props.store
//     }
//   }
//   render () {
//     return this.props.children;
//   }
// }
// Provider.childContextTypes = {
//   store: PropTypes.object
// }

ReactDOM.render(<Provider store={createStore(todoApp)}><TodoApp /></Provider>, document.getElementById('root'));
