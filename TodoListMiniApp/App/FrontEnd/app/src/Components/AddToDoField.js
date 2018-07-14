import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

class AddToDoField extends Component{

    constructor(props){
        super(props)

        this.state = {
            title : '',
            descrioption : ''
        }
    }

    render(){
        return (<div style={{margin : '20px'}}>
                <h1>Todo List App</h1>
                <h3>Add a new event here</h3>
                <FormGroup controlId="formValidationNull" validationState={null} >
                    <ControlLabel>Title</ControlLabel>
                    <FormControl type="text" placeholder="Event Title" 
                        value={this.state.title} onChange={(e) => this.setState({title : e.target.value})}/>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Description</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="add a description here..." 
                        value={this.state.descrioption} onChange={(e) => this.setState({descrioption : e.target.value})}/>
                </FormGroup>
                <Button onClick={() => {
                    var request = {'title': this.state.title, 'description' : this.state.descrioption, 'complete' : false}
                    this.props.add_event_handle(request)
                    this.setState({title : '', descrioption : ''})
                }}>Add Event to List</Button>
            </div>)
    }
}
AddToDoField.propTypes = {
    add_event_handle : PropTypes.func.isRequired
}
AddToDoField.defaultProps = {
    add_event_handle : ()=>{}
}

export default AddToDoField