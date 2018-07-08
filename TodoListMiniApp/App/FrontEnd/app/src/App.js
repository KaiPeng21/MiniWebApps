
import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

import AddToDoField from './Components/AddToDoField.js'
import ListBlock from './Components/ListBlock.js'

var testlist = [{
  title : 'test title',
  descrioption : 'descripting',
  add_date : '2017',
  complete : false
}, {
  title : 'test title 2',
  descrioption : 'descripting 2',
  add_date : '2018',
  complete : true
}]

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      id : -1,
      title : '',
      description : '',
      complete : false,
      add_date : ''
    }

    this.httpGetHandle = this.httpGetHandle.bind(this)
  }

  httpGetHandle(){

    console.log('id ' + this.state.id )

    /*
    axios.post('http://localhost:8080/task', {'title':'aws study', 'descrioption' : 'studying aws', 'complete' : false})
    .then(response => console.log(response))
    */

   axios.get('http://localhost:5000/task?complete=true')
   .then(response => console.log(response))

  }

  render () {
    return (
      <div className='button__container'>
        <AddToDoField />
        <button className='button' onClick={this.httpGetHandle}>Click Me</button>
        <ListBlock todolist={testlist}/>
      </div>
    )
  }
}
export default App