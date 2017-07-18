import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

var _BoardUtils = require('./BoardUtils');

class Board extends Component {
    constructor(props) {
        super(props);
        let nbCells = props.nbRows * props.nbCols;
        let cells = _BoardUtils.initBoard(props.nbRows, props.nbCols, props.nbMines);
        this.state = {
            nbCells: nbCells,
            cells: cells,
            remainingCells: nbCells - props.nbMines,
            gameOver: false
        };
    }

    handleClick(clickedCell) {
        const cells = this.state.cells.slice();
        let current = cells[clickedCell.index];
        if (current.isMined) {

            _BoardUtils.discloseAll(cells);
            this.setState({
                cells: cells,
                gameOver: true
            });
            return;
        }
        current.isDisclosed = true;
        if (current.adjacentMinesCount === 0) {
            _BoardUtils.propagate(cells, current);
        }


        this.setState({
            cells: cells,
            remainingCells: _BoardUtils.getRemainingCells(cells)
        });
    }

    renderCell(cell) {
        return (
            <Cell
                key={cell.index}
                value={cell}
                onClick={() => this.handleClick(cell)}
            />
        );
    }

    // Row start index = Last index of last row + 1
    renderRow(rowId, nbCols) {
        let row = [];
        let startIdx = rowId * nbCols;
        for (let colId = 0; colId < nbCols; colId++) {
            row.push(this.renderCell(this.state.cells[startIdx + colId]));
        }
        return (
            <div className="board-row" key={startIdx}>{row}</div>
        );
    }


    render() {

        let status = this.state.gameOver ? 'Oooh Noooo! ' : 'Cells Left: ' + this.state.remainingCells;
        let grid = [];
        for (let rowId = 0; rowId < this.props.nbRows; rowId++) {
            grid.push(this.renderRow(rowId, this.props.nbCols));
        }

        return (
            <div className="board-grid">
                <div className="board-header">{status}</div>
                {grid}
            </div>
        );
    }
}
export default Board;
