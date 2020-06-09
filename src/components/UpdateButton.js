import React, { Component } from 'react'


class UpdateButton extends Component {
    render() {
        return (
            <button onClick={() => this.props.handleShow(this.props.idToDo)}>
                <img 
                src="https://www.shareicon.net/data/512x512/2017/02/09/878618_edit_512x512.png" 
                alt="edit"
                style={{width:'9px'}}
                />
            </button>
        )
    }
}

export default UpdateButton