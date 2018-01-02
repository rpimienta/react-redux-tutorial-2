import React, { Component } from 'react';
import User from './User';

class Users extends Component{
  state={
    users: [
      {name:"John", age:20, edit: false},
      {name:"Jill", age:30, edit: false},
      {name:"Jack", age:40, edit: false}
    ],
    title:"Users List"
  }

  makeYounger = () =>{
    const newState = this.state.users.map((user) => {
      let tempUser = user;
      tempUser.age -= 10;
      return tempUser;
    });
    this.setState( newState );
  }

  makeOlder = () =>{
    const newState = this.state.users.map((user) => {
      let tempUser = user;
      tempUser.age -= 10;
      return tempUser;
    });
    this.setState( newState );
  }

  editUser = (index)=>{
    const newState = this.state.users.map((user) => {
      let tempUser = user;
      tempUser.age -= 10;
      return tempUser;
    });
    this.setState( newState );
  }

  render(){
    const userList = {
      width:'15%',
      border: '1px solid',
      marginTop: '10px',
      padding: '20px'
    }
    return (
      <div style={userList}>
        <button onClick={this.makeYounger}>Make Younger Age</button>
        <button onClick={this.makeOlder}>Make Older</button>
      <br/>
      <h1>{this.state.title}</h1>
      {
        this.state.users.map((user,index)=>{
          
          return  <div><input onChange={()=>{ this.editUser(user,index)}} type="checkbox"/><User age={user.age}>{user.name}</User></div> 
          
        })
      }
      </div>)
  }
}

export default Users;