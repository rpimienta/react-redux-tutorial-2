import React, {Component} from 'react';
import VanillaTilt from 'vanilla-tilt';

class Vanilla extends Component{
  componentDidMount (){
    VanillaTilt.init(this.rootNode, {
		max: 25,
    speed: 400,
    glare:true,
    'max-glare': 0.5,
	});
  }
  render(){
    const vanillaMain = {
      width:'32%',
      border: '1px solid',
      marginTop: '10px',
      padding: '20px'
    }
    const vBox={
      width:'100%',
      backgroundImage: 'linear-gradient(135deg, #ff00ba 0%, #fae713 100%)',
      height: '200px',
      textAlign:'center',
      color:'black'
    }
    const vInner = {
      position: 'absolute',
      width: '50%',
      height: '50%',
      top: '25%',
      left: '25%',
      background: 'white'
    }
    return (
      <div style={vanillaMain}>
        <div 
          ref={(node) => { this.rootNode = node; }}
          style={vBox}
        >
          <div  {...this.props}/>
        </div>
      </div>
    )
  }
}

export default Vanilla;