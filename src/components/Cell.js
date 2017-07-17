import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    render() {
        var label = null;
        if (this.props.value === 'X') {
            label = this.props.value;
        }
        return (
            <button className={"cell " + (this.props.value === "DISCLOSED" ? "cell-disclosed" : "")}
                    onClick={this.props.onClick}>
                {label}
            </button>
        );
    }
}

export default Cell;
