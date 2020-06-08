import React, { Component } from 'react'
import {ToDoConsumer} from './../lib/ToDoProvider'

class AddToDo extends Component {

    state = {
        title: "",
        body: "",
    };

    handleSubmit = (e) => {
        e.preventDefault();
    
        const {title, body} = this.state;
    
        this.props.createToDo(title, body)
    };


    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    render() {
        return (
            <div>
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
        )
    }
}

export default ToDoConsumer(AddToDo)
