import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
    constructor(props) {
        super(props);
        let nbCells = props.nbRows * props.nbCols;
        let cells = initBoard(props.nbRows, props.nbCols, props.nbMines);
        this.state = {
            nbCells: nbCells,
            cells: cells,
            remainingCells: nbCells - props.nbMines
        };
    }

    handleClick(currentCell) {
        const cells = this.state.cells.slice();
        if (cells[currentCell.index].isMined) {
            alert("You lost!");
            return;
        }
        cells[currentCell.index].isDisclosed = true;
        let remainingCells = getRemainingCells(cells);
        this.setState({
            cells: cells,
            remainingCells: remainingCells
        });
        console.log("Remaining Cells : " + remainingCells);
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

        let status = 'Cells Left: ' + this.state.remainingCells;
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


function initBoard(nbRows, nbCols, nbMines) {
    let cells = initCells(nbRows, nbCols);

    cells = placeMines(cells, nbMines);

    console.log("Remaining Cells : " + getRemainingCells(cells));
    return cells;
}

function initCells(nbRows, nbCols) {
    return Array(nbRows * nbCols).fill()
        .map((cell, index) => {
            return {
                index: index,
                adjacentCells: computeAdjacentCells(index, nbCols, nbRows),
                adjacentMinesCount: 0,
                isMined: false,
                isDisclosed: false
            };
        });
}
function placeMines(cells, nbMines) {
    for (let i = 0; i < nbMines; i++) {
        let minePlaced = false;
        while (!minePlaced) {
            let randomCell = Math.floor((Math.random() * cells.length));
            if (!cells[randomCell].isMined) {

                let currentCell = cells[randomCell];
                currentCell.isMined = true;
                minePlaced = true;

                // Incrementing adjacent cells mines count
                currentCell.adjacentCells.forEach((adjacentCell) => {
                    cells[adjacentCell].adjacentMinesCount++;
                });

            }
        }
    }

    // Cleaning up
    cells.forEach(function(cell) {
        if(cell.isMined){
            cell.adjacentMinesCount = 0;
        }
    });

    console.log(cells);

    let nbMinedCells = cells.filter((cell) => {
        return cell.isMined;
    }).length;
    console.log("Total Cells : " + cells.length);
    console.log("Mined Cells : " + nbMinedCells);
    return cells;
}

function getRemainingCells(cells) {

    let nbMinedCells = cells.filter((cell) => {
        return cell.isMined;
    }).length;

    let nbDisclosedCells = cells.filter((cell) => {
        return cell.isDisclosed;
    }).length;
    return cells.length - nbMinedCells - nbDisclosedCells;
}

function computeAdjacentCells(currentCell, nbCols, nbRows) {
    let adjacentCells = [];
    let hasLeftCell = currentCell % nbCols > 0;
    let hasRightCell = (currentCell % nbCols) < nbCols - 1;
    let hasUpperCell = currentCell > nbCols - 1;
    let hasLowerCell = currentCell < (nbRows - 1) * nbCols;

    if (hasLeftCell) {
        // Adjacent LEFT Cell
        adjacentCells.push(currentCell - 1);
    }

    if (hasRightCell) {
        // Adjacent RIGHT Cell
        adjacentCells.push(currentCell + 1);
    }

    if (hasUpperCell) {
        // Adjacent UPPER Cell
        adjacentCells.push(currentCell - nbCols);

        if (hasLeftCell) {
            // Adjacent UPPER LEFT Cell
            adjacentCells.push(currentCell - nbCols - 1);
        }
        if (hasRightCell) {
            // Adjacent UPPER RIGHT Cell
            adjacentCells.push(currentCell - nbCols + 1);
        }
    }

    if (hasLowerCell) {

        // Adjacent LOWER Cell
        adjacentCells.push(currentCell + nbCols);

        if (hasLeftCell) {
            // Adjacent LOWER LEFT Cell
            adjacentCells.push(currentCell + nbCols - 1);
        }

        if (hasRightCell) {
            // Adjacent LOWER LEFT Cell
            adjacentCells.push(currentCell + nbCols + 1);
        }
    }
    return adjacentCells.sort();
}