import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {Button, Panel, Glyphicon} from 'react-bootstrap'

class List extends Component{

    render(){
        return (<Panel bsStyle={this.props.complete? 'success' : 'info'}>
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">{this.props.title}</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <div style={{color: 'gray'}}>{this.props.add_date}</div> <br />
                        {this.props.description} 
                        <div style={{margin: '2px', float:'right'}}><Button bsStyle="info" > <Glyphicon glyph="ok" /> Complete</Button></div>
                        <div style={{margin: '2px', float:'right'}}><Button bsStyle="warning" ><Glyphicon glyph="remove" /> Remove</Button></div>
                    </Panel.Body>
                </Panel>)
    }

}
List.propTypes = {
    title : PropTypes.string.isRequired,
    description : PropTypes.string,
    add_date : PropTypes.string,
    complete : PropTypes.bool.isRequired
}
List.defaultProps = {
    title : '[Empty Title]',
    description : '[No Description]',
    add_date : '',
    complete : false
}

export default List