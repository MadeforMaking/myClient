import React, { Component } from 'react';
import './App.css';
var Fraction = require('fractional').Fraction;


function toInches(mm) {
  return mm / 25.4;
}

function toMilimeters(inch) {
  return inch * 25.4;
}

function toPounds(kg) {
  return kg / 0.45359237;
}

function toKilograms(lbs) {
  return lbs * 0.45359237;
}

function toNewtons() {
  return 0;
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
  const rounded = Math.round(output * 100000) / 100000;
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


//Implement this to work with the List Component
const scaleNames = {
  mm: 'Milimeters',
  in: 'Inches'
}

//Implement this externally in conversions.js file
const modes = [
  {
    value: 'mm_in',
    scales: [{
      unit: 'mm',
      name: 'Milimeters',
      func: toMilimeters
    },
    {
      unit: 'in',
      name: 'inches',
      func: toInches
    }],
  },
  {
    value: 'lbs_kg',
    scales: [{
      unit: 'lbs',
      name: 'Pounds',
      func: toPounds
    },
    {
      unit: 'kg',
      name: 'Kilograms',
      func: toKilograms
    }],
  },
  {
    value: 'lbs_kg_N',
    scales: [{
      unit: 'lbs',
      name: 'Pounds',
      func: toPounds
    },
    {
      unit: 'kg',
      name: 'Kilograms',
      func: toKilograms
    },
    {
      unit: 'N',
      name: 'Newtons',
      func: toNewtons
    }],
  },
]

class ConversionList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {};
  }

  handleChange(event) {
    this.props.onModeChange(event.target);
  }

  render() {
    const modes = this.props.modes;
    const mode = this.props.defaultMode;
    return (
      <select defaultValue={mode.value} onChange={this.handleChange}>
        {modes.map((mode, index) => {
          return (
            <option value={mode.value} key={index}>{mode.scales.map((scale) => {
              return scale.unit;
            }).join(" <> ")}</option>
          );
        })}
      </select>
    )
  }
}

class ConversionInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onInputChange(event.target);
  }

  render() {
    const conversion = this.props.conversion;
    return (
      <input value={conversion} placeholder={this.props.placeholder} onChange={this.handleChange} />
    )
  }
}

class ConversionCard extends Component {
  constructor(props) {
    super(props);
    const defMode = 0;
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMilimeterChange = this.handleMilimeterChange.bind(this);
    this.handleInchChange = this.handleInchChange.bind(this);
    this.state = {
      modes: modes,
      conversion: '',
      conversions: modes[defMode].scales.map((scale) => {
        return '';
      }),
      modeIndex: defMode,
      lastScale: modes[defMode].scales[defMode].name,
    };
  }

  handleModeChange(target) {
    console.log(target);
    let a = this.state.modes.map((mode, index) => {
      return mode.value;
    });
    this.setState({ modeIndex: a.indexOf(target.value), conversions: ['', ''] });
  }

  handleChange(target) {
    let conversions = this.state.modes[this.state.modeIndex].scales.map((scale, index) => {
      if (target.placeholder === scale.name) {
        return target.value;
      }
      return tryConvert(target.value, scale.func);
    });
    this.setState({ lastScale: target.placeholder, conversion: target.value, conversions: conversions });
  }

  handleInchChange(conversion) {
    this.setState({ lastScale: 'in', conversion });
  }

  handleMilimeterChange(conversion) {
    this.setState({ lastScale: 'mm', conversion });
  }

  render() {
    const conversion = this.state.conversion;
    const mode = this.state.modes[this.state.modeIndex];
    const lastScale = this.state.lastScale;
    const conversions = this.state.conversions;

    // need to implement new modes state 
    const milimeters = lastScale === 'in' ? tryConvert(conversion, toMilimeters) : conversion;
    const inches = lastScale === 'mm' ? tryConvert(conversion, toInches) : conversion;
    return (
      <div className="Card-Conversion">
        <h1>Conversion Card</h1>
        <fieldset>
          <ConversionList modes={modes} defaultMode={mode} onModeChange={this.handleModeChange} />
          <legend>Enter Conversion values</legend>
          {mode.scales.map((scale, index) => {
            return <ConversionInput key={index} scale={scale.name} placeholder={scale.name} conversion={conversions[index]} onInputChange={this.handleChange} />
          })}
          {/* <ConversionInput scale="mm" conversion={milimeters} onInputChange={this.handleMilimeterChange} />
          <ConversionInput scale="in" conversion={inches} onInputChange={this.handleInchChange} /> */}
          {isFraction(toFraction(conversion)) && <FractionForm value={parseFloat(conversion)} />}
        </fieldset>
      </div>
    )
  }
}

export default App;