import React, { Component } from 'react';
import logo from './logo.svg';
import Board from './components/Board';

import './App.css';
class App extends Component {

    constructor(props) {
        super(props);

        var nbRows = Math.floor((Math.random() * 10) + 5);
        var nbCols = Math.floor((Math.random() * 10) + 5)

        this.state = {
            nbRows: nbRows,
            nbCols: nbCols,
            nbMines: Math.floor((Math.random() * nbRows * nbCols / 2) + 4)
        };
    }


    render() {


        return (
            <div className="app">
                <div className="app-header">
                    <img src={logo} className="app-logo" alt="logo"/>
                    <h2>Minesweeper - ReactJS</h2>
                </div>
                <div className="app-body">
                    <Board nbRows={this.state.nbRows} nbCols={this.state.nbCols} nbMines={this.state.nbMines}/>
                </div>
            </div>
        );
    }
}

export default App;
