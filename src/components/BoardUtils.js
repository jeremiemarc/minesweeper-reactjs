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

function logInit(cells) {
    let nbMinedCells = cells.filter((cell) => {
        return cell.isMined;
    }).length;
    console.log("Total Cells : " + cells.length);
    console.log("Mined Cells : " + nbMinedCells);
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
    cells.forEach(function (cell) {
        if (cell.isMined) {
            cell.adjacentMinesCount = 0;
        }
    });
    logInit(cells);
    return cells;
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

export function initBoard(nbRows, nbCols, nbMines) {
    let cells = initCells(nbRows, nbCols);
    return placeMines(cells, nbMines);
}

export function getRemainingCells(cells) {

    let nbMinedCells = cells.filter((cell) => {
        return cell.isMined;
    }).length;

    let nbDisclosedCells = cells.filter((cell) => {
        return cell.isDisclosed;
    }).length;
    return cells.length - nbMinedCells - nbDisclosedCells;
}


export function propagate(cells, current) {
    current.adjacentCells.forEach((idx) => {
        let adjacent = cells[idx];
        if (adjacent.adjacentMinesCount === 0 && !adjacent.isDisclosed) {
            adjacent.isDisclosed = true;
            propagate(cells, adjacent);
        }
    });
}

export function discloseAll(cells) {
    cells.forEach((cell) => {
        if (!cell.isDisclosed) {
            cell.isDisclosed = true;
        }
    });
}