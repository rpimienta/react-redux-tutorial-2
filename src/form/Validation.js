import React, {Component} from 'react';

class ValidationForm extends Component{
  state = {
    error:  ''
  }
  handleSubmit= (event) =>{
    const {error} = this.state;
    event.preventDefault();
    this.setState( { error: this.getErrorMessage(this.inputNode.value)})
    error? alert(error) : alert('no problem')
  }
  handleChange = (event) =>{
    const {value} = event.target;
    this.setState( { error: this.getErrorMessage(value)})
  }

  getErrorMessage = (value) => {
    if(value.length < 3){
      return 'The value must be at least 3 characters length'
    }
    if(!value.includes('s') ){
      return `The value must contain a letter "s" `
    }
    return null
  }
  render(){
    const {error} = this.state;
    const mainForm = {
      width:'32%',
      border: '1px solid',
      marginTop: '10px',
      padding: '20px'
    }
    return(
      <div style={mainForm}>
        <h1>Dynamic Validation Form</h1>
        <form action="" onSubmit={this.handleSubmit}>
          <input 
            type="text" name="username" 
            ref={ node=>{ this.inputNode = node}}
            onChange={this.handleChange}/>
          <button disabled={Boolean(error)}>Submit</button>
          <br/>
          { error? <label style={{color:'red'}}>{error}</label> : ''}
        </form>
      </div>
    )
  }
}

export default ValidationForm;