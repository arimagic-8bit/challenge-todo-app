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
                            singleTodo={valueFromProvider.singleTodo}
                            getAllToDo={valueFromProvider.getAllToDo}
                            deleteToDo={valueFromProvider.deleteToDo}
                            createToDo={valueFromProvider.createToDo}
                            updateToDo={valueFromProvider.updateToDo}
                            oneToDoById={valueFromProvider.oneToDoById}
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
        singleTodo: {}
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

    oneToDoById = (todoId) => {
        axios
        .get(`http://localhost:4000/api/v1/todos/${todoId}`)
        .then((response) => {
            const todo = response.data;
            this.setState({singleTodo:todo});
        })
        .catch((err) => console.log(err))
    };

    // in order to show the updated todos inside the then I have to find the index of the 
    // updated todo for removing the previous info and put the new one with the splice
    // method. If I don't do this, the page doesn't show the new info. 

    updateToDo = (title, body, todoId) => {

        const previousTitle = this.state.singleTodo.title;
        const previousBody = this.state.singleTodo.body;

        axios
        .put(`http://localhost:4000/api/v1/todos/${todoId}`, {
            title: title ? title : previousTitle,
            body: body ? body : previousBody
        })
        .then((response) => {
            const todoList = [...this.state.todos];
            const updatedToDo = response.data;
            const index = this.state.todos.findIndex(todo => todo._id === updatedToDo._id)
            todoList.splice(index, 1, updatedToDo)
            this.setState({todos:todoList})
        })
        .catch((err) => console.log(err))
    }

    // all the data come from the state (we deconstruct them) and the methods from the this
    // (we deconstruct them also)
    // we pass all the data and the methods we need to use in all the app to the Provider
    // and we have to share it all with the Consumer
    
    render() {

        const {todos, title, body, singleTodo} = this.state

        const {getAllToDo, deleteToDo, createToDo, updateToDo, oneToDoById} = this

        return (
            <Provider value={{todos, title, body, singleTodo, getAllToDo, deleteToDo, createToDo, updateToDo, oneToDoById}}>
                {this.props.children}
            </Provider>
        )
    }
}

export {ToDoProvider, ToDoConsumer}
