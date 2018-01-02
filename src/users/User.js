import React from 'react';

const User = (props) =>{
  const style={
    display:'inline-block'
  }
  let age = props.age ? props.age : 'NA';
  if(props.children){
    return(
      <div style={style}>Name: {props.children} | Age: {age}</div>
    )
  }else{
    return(<span>Invalid Entry</span>)
  }
  
}
const PropTypes = {
  number(props, propName, componentName){
    if(typeof props[propName] !== 'number'){
      return new Error(`hey you should pass a number for ${propName} in ${componentName} but you passed a ${typeof props[propName]} !`)
    }
  }
}
User.propTypes = {
  age: PropTypes.number
}

export default User;