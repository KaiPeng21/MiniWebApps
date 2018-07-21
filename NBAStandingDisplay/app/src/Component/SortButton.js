import React, {Component} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';

import PropTypes from 'prop-types';

class SortButton extends Component{

    render(){
        return (<div style={{float : 'right'}}><Button bsSize='xsmall' onClick={
            () => {
                this.props.sortHandle(this.props.conference, this.props.columnID)
            }
        }><Glyphicon glyph='arrow-down'/></Button></div>)
    }
}
SortButton.propTypes = {
    conference : PropTypes.string,
    sortHandle : PropTypes.func.isRequired,
    columnID : PropTypes.number.isRequired
}

export default SortButton