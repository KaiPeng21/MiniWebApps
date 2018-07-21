import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Table} from 'react-bootstrap';
import SortButton from './SortButton';


class StandingTable extends Component{
    render(){

        return (<div>
            <h2>{this.props.conference}ERN CONFERENCE STANDING</h2>
            <Table striped bordered condensed hover>
                <thead style={{backgroundColor : 'lightblue'}}>
                    <tr>
                        {this.props.heading.map((val, ind) => {
                            return <th key={ind}>{val}<SortButton sortHandle={this.props.sortHandle} conference={this.props.conference} columnID={ind}/></th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.props.body.map((dataRow, dataRowInd) => { 
                        return (<tr key={dataRowInd}>{dataRow.map((val, ind) => {
                            return <td key={ind}>{val}</td>
                        })}</tr>)
                    })}
                </tbody>
            </Table>
            </div>)
    }
}
StandingTable.propTypes = {
    conference : PropTypes.string.isRequired,
    heading : PropTypes.array.isRequired,
    body : PropTypes.array.isRequired,
    sortHandle : PropTypes.func.isRequired
}

export default StandingTable;