import React, { Component , useState, useEffect } from 'react';
import './App.css';

class App extends Component {
  render(){
    return (
    <div className="App">
      <Head/>
      <div className="App-Content">
        <ConversionCard/>
      </div>
    </div>
  );
  }
}

function Head(props){
  return(
    <div className="App-Head">
      <Bar />
    </div>
  )
}

function Bar(props){
  return <h1 className="App-Title">Home Server</h1>
}

class ConversionCard extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    return(
      <div className="Conversion-Card">
        <h1>Conversion Card</h1>
      </div>
    )
  }
}

class Toggle extends Component {
  constructor(props){
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render(){
    return(
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}
  
export default App;
