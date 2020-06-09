import React, { Component } from 'react'
import {ToDoConsumer} from './../lib/ToDoProvider'


class Modal extends Component {

    state = {
        title: '',
        body: ''
    }

    handleChange = (e) => {
        const {name, value}= e.target;
        this.setState({[name]:value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
    
        const {singleTodo} = this.props;
        const {title, body} = this.state;

        this.props.updateToDo(title, body, singleTodo._id)
        this.props.handleClose()
    }

    render() {
        const showOrHide = this.props.show ? 'modal display-block' : 'modal display-none';
        const {singleTodo} = this.props

        return (
            <div className={showOrHide}>
                <form
                className='modal-main'
                onSubmit={this.handleSubmit} >
                    <h3>Edit To Do</h3>
                    <input 
                    type="text" 
                    name='title'
                    placeholder={singleTodo.title}
                    value={this.state.title}
                    onChange={this.handleChange}
                    />
                    <input 
                    type='text' 
                    name='body'
                    placeholder={singleTodo.body}
                    value={this.state.body}
                    onChange={this.handleChange}
                    />
                    <button type='submit'>OK</button>
                </form>
            </div>
        )
    }
}

export default ToDoConsumer(Modal)
