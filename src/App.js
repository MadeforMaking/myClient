import React, { Component } from 'react';
import './App.css';
var Fraction = require('fractional').Fraction;


function toInches(mm) {
  return mm / 25.4;
}

function toMilimeters(inch) {
  return inch * 25.4;
}

function toFraction(value) {
  return (new Fraction(value).toString());
}

function isFraction(value) {
  if (isNaN(Number(value)) & (String(value).indexOf('/') !== -1) & (String(value).indexOf('undefined') <= 0)) {
    return true;
  }
  return false;
}

function tryConvert(value, conversion) {
  const input = parseFloat(value);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = conversion(input);
  const rounded = Math.round(output * 1000) / 1000;
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

function FractionForm(props) {
  return (
    <p>The fraction is {toFraction(props.value)} </p>
  );
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

const scaleNames = {
  mm: 'Milimeters',
  in: 'Inches'
}

class ConversionInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onConversionChange(e.target.value);
  }

  render() {
    const conversion = this.props.conversion;
    const scale = this.props.scale;
    return (
      <input value={conversion} placeholder={scaleNames[scale]} onChange={this.handleChange} />
    )
  }
}

class ConversionCard extends Component {
  constructor(props) {
    super(props);
    this.handleMilimeterChange = this.handleMilimeterChange.bind(this);
    this.handleInchChange = this.handleInchChange.bind(this);
    this.state = {
      conversion: '',
      scale: 'mm'
    };
  }

  handleInchChange(conversion) {
    this.setState({ scale: 'in', conversion });
  }

  handleMilimeterChange(conversion) {
    this.setState({ scale: 'mm', conversion });
  }

  render() {
    const conversion = this.state.conversion;
    const scale = this.state.scale;
    const milimeters = scale === 'in' ? tryConvert(conversion, toMilimeters) : conversion;
    const inches = scale === 'mm' ? tryConvert(conversion, toInches) : conversion;
    return (
      <div className="Card-Conversion">
        <h1>Conversion Card</h1>
        <fieldset>
          <ConversionList />
          <legend>Enter Conversion values</legend>
          <ConversionInput scale="mm" conversion={milimeters} onConversionChange={this.handleMilimeterChange} />
          <ConversionInput scale="in" conversion={inches} onConversionChange={this.handleInchChange} />
          {isFraction(toFraction(conversion)) && <FractionForm value={parseFloat(conversion)} />}
        </fieldset>
      </div>
    )
  }
}

export default App;