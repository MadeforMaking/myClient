/*
ConversionCards Components
Converting numbers e.g. Milimeter to Inches

Define the conversion in the 'ConversionModes.js' file
*/

import React, { Component } from 'react';
import { modes } from './ConversionModes';
var Fraction = require('fractional').Fraction;


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


function FractionForm(props) {
    return (
        <p>The fraction is {toFraction(props.value)} </p>
    );
}


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

export class ConversionCard extends Component {
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
        const conversions = this.state.conversions;

        return (
            <div className="Card-Conversion">
                <h1>Conversion Card</h1>
                <fieldset>
                    <ConversionList modes={modes} defaultMode={mode} onModeChange={this.handleModeChange} />
                    <legend>Enter Conversion values</legend>
                    {mode.scales.map((scale, index) => {
                        return <ConversionInput key={index} scale={scale.name} placeholder={scale.name} conversion={conversions[index]} onInputChange={this.handleChange} />
                    })}
                    {isFraction(toFraction(conversion)) && <FractionForm value={parseFloat(conversion)} />}
                </fieldset>
            </div>
        )
    }
}