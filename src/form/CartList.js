import React, {Component} from 'react';

class CartList extends Component{
  state={
    fruits:[]
  }

  handleAdd = ()=> {
    const {value} = this.inputFruit;
    const newFruits = this.state.fruits.map( v => v.trim());
    newFruits.push({name:value});
    this.setState( {fruits: newFruits} );
    this.inputFruit.value = '';
  }
  handleKeyPress = (event) => {
    if(event.key === 'Enter' ){
      const {value} = this.inputFruit;
      const newFruits = this.state.fruits;
      newFruits.push({name:value});
      this.setState( {fruits: newFruits} );
      this.inputFruit.value = '';
    }
  }
  handleRemove = (index) => {
    const newFruits = this.state.fruits;
    newFruits.splice(index,1);
    this.setState( {fruits: newFruits} );
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
        <h1>CartList</h1>
        <input 
          ref={ node => this.inputFruit = node} 
          onKeyPress={this.handleKeyPress}
          type="text" name="addFruitInput" />
        <button onClick={this.handleAdd}>Add</button>
        <br/>
        <div>
          {
            this.state.fruits.map( (fruit,index) => {
              return(
              <div>
                <label>{fruit.name}</label>
                <button onClick={() => this.handleRemove(index)}>Remove</button>
              </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default CartList;