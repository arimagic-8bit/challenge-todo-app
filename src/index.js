import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ToDoProvider} from './lib/ToDoProvider'

ReactDOM.render(
    <ToDoProvider>
        <App />
    </ToDoProvider>
    , document.getElementById('root'));


