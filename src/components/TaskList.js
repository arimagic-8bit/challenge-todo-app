import React, { Component } from "react";
import {ToDoConsumer} from './../lib/ToDoProvider' //this component will consume the
// data from the Provider

import AddToDo from './AddToDo'
import DeleteButton from './DeleteButton'
import UpdateButton from './UpdateButton'

class TaskList extends Component {
  
  // when component mounts, show me all the todos
  componentDidMount() {
    this.props.getAllToDo()
  }

  //We put onClick in arrow function to avoid removing all todos at first

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
                <div>
                  <DeleteButton 
                  TodoId={todo._id} 
                  index={index} 
                  />
                  <UpdateButton
                  TodoId={todo._id} 
                  index={index}
                  />
                </div>
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
