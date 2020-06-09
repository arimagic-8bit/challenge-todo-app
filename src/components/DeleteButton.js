import React, {Component} from 'react'
import {ToDoConsumer} from './../lib/ToDoProvider'

// We put onClick in arrow function to avoid removing all todos at first


class DeleteButton extends Component {
    
    render () {
        return (
        <button
            className="delete"
            onClick={() => this.props.deleteToDo(this.props.TodoId, this.props.index)}
            >
            X
        </button>
    )}
}

export default ToDoConsumer(DeleteButton)