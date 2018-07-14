import PropTypes from 'prop-types'
import React, { Component } from 'react'

import List from './List.js'

class ListBlock extends Component{

    render(){
        return(<div style={{marginLeft : '20px', marginRight: '20px', marginTop: '10px'}}>
            {this.props.todolist.map((item, ind) => <List key={ind} {...item} removeHandle={this.props.removeHandle} completeHandle={this.props.completeHandle}/>)}
        </div>)
    }
}
ListBlock.propTypes = {
    todolist : PropTypes.array.isRequired,
    removeHandle : PropTypes.func.isRequired,
    completeHandle : PropTypes.func.isRequired
}
ListBlock.defaultProps = {
    todolist : [],
    removeHandle : () => {console.log("Error: removeHandle in ListBlock.js not set")},
    completeHandle : () => {console.log("Error: copmleteHandle in ListBlock.js not set")}
}

export default ListBlock