import React, {Component} from 'react'
import {ToDoConsumer} from './../lib/ToDoProvider'


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