import React, { Component } from 'react';

class Clock extends Component{
  state = { time : 0, running: false, hide:false};

  handleClick = ()=>{
    this.setState(state => {
      if(state.running){
        clearInterval(this.timer);
      }
      else {
        const startTime = Date.now() - state.time;
        this.timer = setInterval( () =>{
          this.setState({time : Date.now() - startTime}, ()=>{console.log(this.state.time);})
          
        })
      }

      return {running: !state.running}
    })
  }
  handleClear = () =>{
    clearInterval(this.timer);
    this.setState({time:0, running:false});
  }

  handleChange = () =>{
    this.setState({hide: !this.state.hide});
  }

  componentWillUnmount = () =>{
    clearInterval(this.timer);
  }

  render() {
    const {time, running} = this.state;
    const timer = {
      width:'15%',
      border: '1px solid',
      marginTop: '10px',
      padding: '20px'
    }
    const button = {
      border: '1px solid #ccc',
      background: '#fff',
      fontSize:'em',
      padding:'15',
      margin: 5,
      width:100

    }
    return (
      <div style={timer}>
      <div>Hide this Timer <input type='checkbox' onChange={this.handleChange}/></div>
      <hr/>
        {
          !this.state.hide? 
            <div>
              <h1>Timer</h1>
              <button style={button} onClick={this.handleClick}>{running? 'Stop' : 'Start'}</button>
              <button style={button} onClick={this.handleClear}>Clear</button>
              <h3 style={{margin: '20px'}}>{time} ms</h3>
            </div>
          : <div></div>
        }
        
        
        
      </div>
    )
    
  }
}

export default Clock;