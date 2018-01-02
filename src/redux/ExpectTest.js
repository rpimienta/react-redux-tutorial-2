import React, {Component} from 'react';
import expect from 'expect';
import deepfreeze from 'deep-freeze';

class ExpectTest extends Component{
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
        <h1>Expect Test</h1>
      </div>
    )
  }
}

const counter = (state = 0, action) => {
  if(action.type === 'INCREMENT'){
    return state + 1;
  }else if( action.type === 'DECREMENT'){
    return state - 1;
  }else{
    return state;
  }
}

expect(
  counter(1, { type: 'INCREMENT'})
).toEqual(2);
expect(
  counter(0, { type: 'DECREMENT'})
).toEqual(-1);
expect(
  counter(3, { type: 'INCREMENT'})
).toEqual(4);
expect(
  counter(3, { type: 'SOMETHING_ELSE'})
).toEqual(3);
expect(
  counter(undefined, { })
).toEqual(0);

console.log('Test passed')
//deepfreeze example

const addCounter = (list)=> {
  // list.push(0);
  return [...list,0]
}
const removeCounter = (list, index)=> {
  // list.splice(index,1);

  return [
    ...list.slice(0,index),
    ...list.slice(index+1)
  ];
}

const incrementCounter = (list, index)=> {
  // list[index]++;
  return [
    ...list.slice(0,index),
    list[index]+1,
    ...list.slice(index+1)
  ];
}

const testAddCounter = () =>{
  const listBefore = [];
  const listAfter = [0];
  deepfreeze(listBefore);
  expect( addCounter(listBefore)).toEqual(listAfter);
}

const testRemoveCounter = () =>{
  const listBefore = [0,1,2];
  const listAfter = [0,2];
  deepfreeze(listBefore);
  expect( removeCounter(listBefore,1)).toEqual(listAfter);
}

const testIncrementCounter = () =>{
  const listBefore = [0,1,2];
  const listAfter = [0,1,3];
  deepfreeze(listBefore);
  expect( incrementCounter(listBefore,2)).toEqual(listAfter);
}

testAddCounter();
console.log('Add test passed for deep freeze');
testRemoveCounter();
console.log('Remove test passed for deep freeze');
testIncrementCounter();
console.log('Increment test passed for deep freeze');

// ---- Toggle ToDo

const toggleTodo = (todo) => {
  // todo.completed = !todo.completed;
  return Object.assign({}, todo, {completed: !todo.completed});
}

const testToggleTodo = () => {
  const todoBefore = {
    id:0,
    text: 'Learn Redux',
    completed: false
  }
  const todoAfter = {
    id:0,
    text: 'Learn Redux',
    completed: true
  }
  deepfreeze(todoBefore);
  expect(toggleTodo(todoBefore)).toEqual(todoAfter)
}

testToggleTodo();
console.log('ToggleTodo test passed');
// ---- Todos example

// Todo Reducer

const todos = (state = [], action) => {
  switch(action.type){
    case 'ADD_TODO':
      return [ 
        ...state,
        {
          id: action.id,
          text:action.text,
          completed:false
        }
      ];
      case 'TOGGLE_TODO':
      return state.map( (todo)=>{
        if(todo.id !== action.id){
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed
        }
      })
    default: return state;
  }
}

const testAddTodoList = () => {
  const todosBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 0,
    text: 'learning redux'
  }
  const todosAfter = [{
    id: 0,
    text: 'learning redux',
    completed: false
  }]
  deepfreeze(todosBefore);
  deepfreeze(action);
  expect(todos(todosBefore,action)).toEqual(todosAfter);

}
const testToggleTodoList = () => {
  const todosBefore = [
    {
      id: 0,
      text: 'Learning Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go Shopping',
      completed: false
    }
  ];
  const action = {
    type: 'TOGGLE_TODO',
    id: 1
  }
  const todosAfter = [
    {
      id: 0,
      text: 'Learning Redux',
      completed: false
    },
    {
      id: 1,
      text: 'Go Shopping',
      completed: true
    }
  ]
  deepfreeze(todosBefore);
  deepfreeze(action);
  expect(todos(todosBefore,action)).toEqual(todosAfter);

}

testAddTodoList();
testToggleTodoList();
console.log('Todo List Reducer passed');

export default ExpectTest;