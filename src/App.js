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
      <Bar></Bar>
      <Clock />
      <Toggle />
    </div>
  )
}

function Bar(props){
  return <h1 className="App-title">Home Server</h1>
}

class Clock extends Component {
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentDidUnmount(){
    clearInterval(this.timerID)
  }

  tick(){
    this.setState({
      date: new Date()
    });
  }

  render(){
    return (
      <div>
        <h2 className="App-text">It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
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
