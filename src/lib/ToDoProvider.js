import React from 'react'
import axios from 'axios'

const {Consumer, Provider} = React.createContext()

function ToDoConsumer(WrappedComponent) {
    return function (props) {
        return (
            <Consumer>
                {(valueFromProvider) => (
                        <WrappedComponent
                            {...props}
                            todos={valueFromProvider.todos}
                            title={valueFromProvider.title}
                            body={valueFromProvider.body}
                            getAllToDo={valueFromProvider.getAllToDo}
                            deleteToDo={valueFromProvider.deleteToDo}
                            createToDo={valueFromProvider.createToDo}
                            updateToDo={valueFromProvider.updateToDo}
                        />
                    )}
            </Consumer>
        )
    }
}


class ToDoProvider extends React.Component {
    
    // things we want to get from the API

    state = {
        todos: [],
        title: "",
        body: "",
    }

    // all the calls we want to do to the API

    getAllToDo = () => {
        axios
        .get("http://localhost:4000/api/v1/todos")
        .then((response) => {
            this.setState({ todos: response.data });
        })
        .catch((err) => console.log(err));
    };

    deleteToDo = (todoId, index) => {
        axios
          .delete(`http://localhost:4000/api/v1/todos/${todoId}`)
          .then(() => {
            const todoList = [...this.state.todos];
            todoList.splice(index, 1);
            this.setState({ todos: todoList });
        })
          .catch((err) => console.log(err));
    };

    createToDo = (title, body) => {
        axios
          .post("http://localhost:4000/api/v1/todos", {
            title: title,
            body: body,
        })
          .then((response) => {
            const newToDo = response.data;
            const todoList = [...this.state.todos];
            todoList.push(newToDo)
            this.setState({ title: "", body: "", todos:todoList}); //set the two properties to initial value (no-value)
        })
          .catch((err) => console.log(err));
    };

    updateToDo = (title, body, todoId) => {
        axios
        .put(`http://localhost:4000/api/v1/todos/${todoId}`, {
            title:title, 
            body:body
        })
        .then((response) => {
            const todo = response.data
        })
        .catch((err) => console.log(err))
    }

    // all the data come from the state (we deconstruct them) and the methods from the this
    // (we deconstruct them also)
    // we pass all the data and the methods we need to use in all the app to the Provider
    // and we have to share it all with the Consumer
    
    render() {

        const {todos, title, body} = this.state

        const {getAllToDo, deleteToDo, createToDo, updateToDo} = this

        return (
            <Provider value={{todos, title, body, getAllToDo, deleteToDo, createToDo, updateToDo}}>
                {this.props.children}
            </Provider>
        )
    }
}

export {ToDoProvider, ToDoConsumer}
