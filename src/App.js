import React, { Component } from "react";
import "./App.css";

import TaskList from "./components/TaskList";

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="principal-title">YOUR TO DO PAGE</h1>
        <TaskList />
      </div>
    );
  }
}

export default App;
