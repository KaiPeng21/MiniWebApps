
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

    this.api_base_uri = 'http://localhost:5000/task'

    this.state = {
      complete_tasks : [],
      incomplete_tasks : []
    }

    this.httpGetHandle = this.httpGetHandle.bind(this)
    this.httpPostHandle = this.httpPostHandle.bind(this)
    this.httpPutHandle = this.httpPutHandle.bind(this)
    this.httpDeleteHandle = this.httpDeleteHandle.bind(this)
  }

  componentWillMount(){
    this.httpGetHandle('complete_tasks', '?complete=true')
    this.httpGetHandle('incomplete_tasks', '?complete=false')
  }

  componentWillUpdate(){

  }

  httpGetHandle(response_state_var, query){

   axios.get(this.api_base_uri + query)
   .then(response => { 
      
      this.setState({
        [response_state_var] : response.data.Tasks
      })

    }).catch((error) => {
     console.log(error)
   })

  }

  httpPostHandle(request){

    /*
    // Example using the post request
    axios.post('http://localhost:5000/task', {'title':'aws study', 'descrioption' : 'studying aws', 'complete' : false})
    .then(response => console.log(response))
    */

    axios.post(this.api_base_uri, request)
    .then(response => {
      //console.log(response.data.InsertedData)
      //console.log(this.state.incomplete_tasks)
      this.setState((prevState, props) =>{
        var copy = prevState.incomplete_tasks.slice()
        copy.push(response.data.InsertedData)
        return {incomplete_tasks : copy}  
      })    
    }).catch((error) => {
      console.log(error);
    })
  }

  httpPutHandle(){

  }

  httpDeleteHandle(){

  }

  render () {
    return (
      <div className='button__container'>
        <AddToDoField add_event_handle={this.httpPostHandle}/>
        <ListBlock todolist={this.state.complete_tasks}/>
        <ListBlock todolist={this.state.incomplete_tasks}/>
      </div>
    )
  }
}
export default App