import React, { Component , useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render(){
    return (
    <div className="App">
      <Head/>
    </div>
  );
  }
}

function Head(props){
  return(
    <div>
      <Bar />
    </div>
  )
}

function Bar(props){
  return <h1 className="App-title">Home Server</h1>
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
