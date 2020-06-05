import React, { Component } from "react";
import axios from "axios";

class TaskList extends Component {
  state = {
    todos: [],
    title: "",
    body: "",
  };

  // when component mounts, show me all the todos
  componentDidMount() {
    this.getAllToDo();
  }

  //get all todos created from API
  getAllToDo = () => {
    axios
      .get("http://localhost:4000/api/v1/todos")
      .then((response) => {
        console.log("response ---->", response.data);
        this.setState({ todos: response.data });
      })
      .catch((err) => console.log(err));
  };

  deleteToDo = (todoId, index) => {
    console.log("Enters here??");

    axios
      .delete(`http://localhost:4000/api/v1/todos/${todoId}`)
      .then(() => {
        const todoList = [...this.state.todos];
        todoList.splice(index, 1);
        this.setState({ todos: todoList });
      })
      .catch((err) => console.log(err));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/v1/todos", {
        title: this.state.title,
        body: this.state.body,
      })
      .then(() => {
        this.setState({ title: "", body: "" }); //set the two properties to initial value (no-value)
        this.getAllToDo(); //and show me all todos + the new one
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  //We put onClick in arrow function to avoid removing all todos at first

  render() {
    return (
      <div>
        <div className="todos-list">
          {this.state.todos.map((todo, index) => {
            return (
              <div key={todo._id} className="todo">
                <div>
                  <h3>{todo.title}</h3>
                  <p className="todo-description">{todo.body}</p>
                  <p className="todo-date">Created : {todo.createdAt}</p>
                </div>
                <button
                  className="delete"
                  onClick={() => this.deleteToDo(todo._id, index)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Write title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input
            type="text"
            className="body"
            placeholder="Write a description"
            name="body"
            value={this.state.body}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default TaskList;
