import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

class AddToDoField extends Component{
    
    render(){
        return (<div style={{margin : '20px'}}>
                <FormGroup controlId="formValidationNull" validationState={null} >
                    <ControlLabel>Title</ControlLabel>
                    <FormControl type="text" placeholder="Event Title"/>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Description</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="add a description here..." />
                </FormGroup>
                <Button>Add Event to List</Button>
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