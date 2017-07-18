import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

    render() {
        let label;
        let cellStyles = [];
        let currentCell = this.props.value;

        if (currentCell.isDisclosed){
            cellStyles.push("cell-disclosed");

            if (currentCell.adjacentMinesCount > 0) {
                label = currentCell.adjacentMinesCount;
                cellStyles.push("cell-adj-" + currentCell.adjacentMinesCount);
            }
        }

        if(currentCell.isMined){
            label = 'X';
        }

        return (
            <button className={"cell " + (cellStyles.length > 0  ? cellStyles.join(" ") : "")}
                    onClick={this.props.onClick}>
                {label}
            </button>
        );
    }
}

export default Cell;
