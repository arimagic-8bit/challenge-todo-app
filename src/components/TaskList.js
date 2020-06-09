import React, { Component } from "react";
import {ToDoConsumer} from './../lib/ToDoProvider' //this component will consume the
// data from the Provider

import AddToDo from './AddToDo'
import DeleteButton from './DeleteButton'
import UpdateButton from './UpdateButton'
import Modal from './Modal'

class TaskList extends Component {
  
  state = {
    show:false
  }

  // when component mounts, show me all the todos
  componentDidMount() {
    this.props.getAllToDo()
  }

  handleShow = (idToDo) => {
    this.setState({show:true})
    this.props.oneToDoById(idToDo)
  }

  handleClose = () => {
    this.setState({show:false})
  }

  render() {
    return (
      <div>
        <div className="todos-list">
          {this.props.todos.map((todo, index) => {
            return (
              <div key={todo._id} className="todo">
                <div>
                  <h3>{todo.title}</h3>
                  <p className="todo-description">{todo.body}</p>
                  <p className="todo-date">Created : {todo.createdAt}</p>
                </div>
                <div className='buttons-container'>
                  <DeleteButton 
                  TodoId={todo._id} 
                  index={index} 
                  className='delete'
                  />
                  <UpdateButton
                  handleShow={this.handleShow} 
                  idToDo={todo._id}
                  />
                </div>
                <Modal 
                  show={this.state.show}
                  handleClose={this.handleClose}
                  />
              </div>
            );
          })}
        </div>
        <AddToDo />
      </div>
    );
  }
}

export default ToDoConsumer(TaskList);
