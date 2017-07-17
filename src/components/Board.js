import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
    constructor(props) {
        super(props);

        let cells = initBoard(props.nbRows * props.nbCols, props.nbMines);
        let undisclosedCells = cells.filter((val) => {
            return val == null;
        }).length;
        this.state = {
            cells: cells,
            undisclosedCells: undisclosedCells
        };
    }

    handleClick(i) {
        const cells = this.state.cells.slice();
        if (cells[i] === 'X') {
            alert("You lost!");
            return;
        }
        cells[i] = 'DISCLOSED';
        this.setState({
            cells: cells,
            undisclosedCells: cells.filter((val) => {
                return val == null;
            }).length
        });
        logProgress(cells);
    }

    renderCell(cellId) {
        return (
            <Cell
                key={cellId}
                value={this.state.cells[cellId]}
                onClick={() => this.handleClick(cellId)}
            />
        );
    }

    // Row start index = Last index of last row + 1
    renderRow(startIdx, nbCols) {
        var row = [];
        for (var i = 0; i < nbCols; i++) {
            row.push(this.renderCell(startIdx + i));
        }
        return (
            <div className="board-row" key={startIdx}>{row}</div>
        );
    }


    render() {

        var status = 'Cells Left: ' + this.state.undisclosedCells;
        var grid = [];
        for (var i = 0; i < this.props.nbRows; i++) {
            // Row start index = Last index of last row + 1
            grid.push(this.renderRow(i * this.props.nbCols, this.props.nbCols));
        }

        return (
            <div className="board-grid">
                <div className="board-header">{status}</div>
                {grid}
            </div>
        );
    }
}

function calculateWinner(cells) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
    return null;
}


export default Board;


function initBoard(nbCells, nbMines) {
    var cells = placeMines(Array(nbCells).fill(null), nbMines);

    logProgress(cells);
    return cells;
}

function placeMines(unminedCells, nbMines) {
    var cells = unminedCells.slice();
    for (var i = 0; i < nbMines; i++) {
        var randomCell;
        let hasToPlaceMine = true;
        while (hasToPlaceMine) {
            randomCell = Math.floor((Math.random() * cells.length));
            if (cells[randomCell] !== "X") {
                cells[randomCell] = "X";
                hasToPlaceMine = false;
            }
        }
    }
    return cells;
}


function placeHints(minedCells, nbMines) {
    var cells =
        minedCells.slice();
    for (var i = 0; i < nbMines; i++) {
        var randomCell;
        let hasToPlaceMine = true;
        while (hasToPlaceMine) {
            randomCell = Math.floor((Math.random() * cells.length));
            if (cells[randomCell] !== "X") {
                cells[randomCell] = "X";
                hasToPlaceMine = false;
            }
        }
    }
    return cells;
}


function logProgress(cells) {
    console.log("Total Cells : " + cells.length);
    console.log("Mined Cells : " + cells.filter((val) => {
            return val === "X";
        }).length);
    console.log("Undisclosed Cells : " + cells.filter((val) => {
            return val == null;
        }).length);
}