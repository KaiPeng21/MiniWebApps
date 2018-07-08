import PropTypes from 'prop-types'
import React, { Component } from 'react'

import List from './List.js'

class ListBlock extends Component{

    render(){
        return(<div style={{marginLeft : '20px', marginRight: '20px'}}>
            {this.props.todolist.map((item, ind) => <List key={ind} {...item}/>)}
        </div>)
    }
}
ListBlock.propTypes = {
    todolist : PropTypes.array.isRequired
}
ListBlock.defaultProps = {
    todolist : []
}

export default ListBlock