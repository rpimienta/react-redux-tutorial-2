import React, {Component} from 'react';

class ControlForm extends Component {
  state = {
    commaSeparated: '',
    multiline: '',
    multiSelect:[]
  }
  availableOptions=[
    'apple','orange','cherry','banana','avocado'
  ]
  handleTextValue = (event)=>{
    const {value} = event.target;
    const allVals = value.split(',').map(v=> v.trim()).filter(Boolean);
    this.setState({
      commaSeparated: value,
      multiline: allVals.join('\n'),
      multiSelect: allVals.filter( val => this.availableOptions.includes(val) )
    });
  }
  handleTextArea = (event)=>{
    const {value} = event.target;
    const allVals = value.split('\n').map(v=> v.trim()).filter(Boolean);
    this.setState({
      commaSeparated: allVals.join(','),
      multiline: value,
      multiSelect: allVals.filter( val => this.availableOptions.includes(val) )
    });
  }
  handleMultiSelect = (event)=>{
    const allVals = Array.from(event.target.selectedOptions).map(option => option.value);
    this.setState({
      multiSelect: allVals,
      multiline:allVals.join('\n'),
      commaSeparated:allVals.join(',')
    });
  }
  render(){
    const {commaSeparated, multiline, multiSelect} = this.state;
    const mainForm = {
      width:'32%',
      border: '1px solid',
      marginTop: '10px',
      padding: '20px',
      textAlign: 'left'
    }
    return(
      <div style={mainForm}>
        <h1>Control Form Values</h1>
        <label>comma separated values:</label>
        <input 
          value={commaSeparated}
          onChange={this.handleTextValue}
          style={{width:'80%'}}
        type="text" name="commaSep" />
        <br/>
        <label>multiline values:</label>
        <textarea 
          value={multiline}
          onChange={this.handleTextArea}
        name="multiline" cols="30" rows="10"></textarea>
        <br/>
        <label >multiselect values:</label>
        <br/>
        <select 
          multiple
          value={multiSelect}
          size={
            this.availableOptions.length
          }
          onChange={
            this.handleMultiSelect
          }
          >
          {
            this.availableOptions.map(
              optionValue=>
              <option value={optionValue} key={optionValue}>{optionValue}</option>
            )
          }
        </select>
      </div>
    )
  }
}

export default ControlForm;