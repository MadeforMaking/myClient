import React, { Component } from 'react';
import { ConversionCard } from './conversions';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Head />
        <div className="App-Content">
          <ConversionCard />
        </div>
      </div>
    );
  }
}

function Head(props) {
  return (<div className="App-Head"> <Bar />
  </div>
  )
}

function Bar(props) {
  return <h1 className="App-Title">Home Server</h1>
}

export default App;