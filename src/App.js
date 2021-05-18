import React, { Component } from 'react';
import './App.css';
var Fraction = require('fractional').Fraction;


function toInches(mm) {
  return mm / 25.4;
}

function FractionForm(props) {
  var frac = (new Fraction(props.value).toString());
  return(
    <p>The fraction is {frac} </p> 
  );
}

function tryConvert(value, conversion){
  const input = parseFloat(value);
  if (Number.isNaN(input)){
    return '';
  }
  const output = conversion(input);
  const rounded = Math.round(output * 1000)/1000;
  return rounded.toString();
}

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

class ConversionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conversions: [
        {
          value: "mm<>in",
          text: "mm <> in",
          func: toInches
        }
      ]
    }
  }
  render() {
    const conversions = this.state.conversions;
    return (
      <select>
        {conversions.map((conv, index) => {
          return (
            <option value={conv.value} key={index}>{conv.text}</option>
          );
        })}
      </select>
    )
  }
}

class ConversionInput extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {conversion: ''};
  }

  handleChange(e) {
    this.setState({ conversion: e.target.value })
  }

  render(){
    const conversion = this.state.conversion;
    const scale = this.props.scale;
    return (
      <input value={conversion} onChange={this.handleChange}/>
    )
  }
}

class ConversionCard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { conversion: '' };
  }

  handleChange(e) {
    this.setState({ conversion: e.target.value })
  }

  render() {
    const value = this.state.conversion;
    return (
      <div className="Card-Conversion">
        <h1>Conversion Card</h1>
        <fieldset>
          <ConversionList></ConversionList>
          <legend>Enter Conversion values</legend>
          <input placeholder="mm" value={value} onChange={this.handleChange}></input>
          <input placeholder="in"></input>
          {
            isNaN(parseFloat(value)) === false && <FractionForm value={parseFloat(value)}/>
          }
        </fieldset>
      </div>
    )
  }
}

export default App;