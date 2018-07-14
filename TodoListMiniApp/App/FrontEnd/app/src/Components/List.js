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
                        <div style={{color: 'gray'}}>{this.props.add_time}</div> <br />
                        {this.props.description} 
                        <div style={{margin: '2px', float:'right'}}>
                            <Button bsStyle={this.props.complete? 'info' : 'success'} onClick={() => {
                                this.props.completeHandle({'id' : this.props.id, 'complete' : !this.props.complete})
                            }}> 
                                <Glyphicon glyph={this.props.complete? 'remove-sign' : 'ok-sign'} /> Mark as {this.props.complete? 'Incomplete' : 'Complete'}
                            </Button>
                        </div>
                        <div style={{margin: '2px', float:'right'}}>
                            <Button bsStyle="warning" onClick={()=> 
                                this.props.removeHandle({'data' : {'id' : this.props.id}
                            })}>
                                <Glyphicon glyph="floppy-remove" /> Remove
                            </Button>
                        </div>
                    </Panel.Body>
                </Panel>)
    }

}
List.propTypes = {
    id : PropTypes.any,
    title : PropTypes.string.isRequired,
    description : PropTypes.string,
    add_date : PropTypes.string,
    complete : PropTypes.bool.isRequired,
    removeHandle : PropTypes.func.isRequired,
    completeHandle : PropTypes.func.isRequired
}
List.defaultProps = {
    id : 'noid',
    title : '[Empty Title]',
    description : '[No Description]',
    add_date : '',
    complete : false,
    removeHandle : ()=>{},
    completeHandle : ()=>{}
}

export default List