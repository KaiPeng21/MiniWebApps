
import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

import AddToDoField from './Components/AddToDoField.js'
import ListBlock from './Components/ListBlock.js'

class App extends Component {

  constructor(props){
    super(props)

    this.api_base_uri = 'http://localhost:5000/task'

    // initialize complete and incomplete tasks
    this.state = {
      complete_tasks : [],
      incomplete_tasks : []
    }

    // bind the http methods
    this.httpGetHandle = this.httpGetHandle.bind(this)
    this.httpPostHandle = this.httpPostHandle.bind(this)
    this.httpPutHandle = this.httpPutHandle.bind(this)
    this.httpDeleteHandle = this.httpDeleteHandle.bind(this)
  }

  componentWillMount(){
    this.httpGetHandle('complete_tasks', '?complete=true')
    this.httpGetHandle('incomplete_tasks', '?complete=false')
  }

  httpGetHandle(response_state_var, query){

   axios.get(this.api_base_uri + query)
   .then(response => { 
    
      var associativeTask = response.data.Tasks.reduce((accum, curr) => { 
        accum[curr['id']] = curr;
        return accum;
      }, [])

      this.setState({
        //[response_state_var] : response.data.Tasks
        [response_state_var] : associativeTask
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

      this.setState((prevState, props) => {
        var copy = prevState.incomplete_tasks.slice()
        copy[response.data.InsertedData['id']] = response.data.InsertedData
        return {incomplete_tasks : copy}
      })

    }).catch((error) => {
      console.log(error);
    })
  }

  httpPutHandle(request){
    
    axios.put(this.api_base_uri, request)
    .then(response => {
      var modifiedObj = response.data.ModifiedData[0]
      this.setState((prevState, props) => {
        var copy_complete = prevState.complete_tasks.slice()
        var copy_incomplete = prevState.incomplete_tasks.slice()

        if (modifiedObj.complete){
          delete copy_incomplete[modifiedObj.id]
          copy_complete[modifiedObj.id] = modifiedObj
        } else {
          delete copy_complete[modifiedObj.id]
          copy_incomplete[modifiedObj.id] = modifiedObj
        }

        return {incomplete_tasks : copy_incomplete,
                complete_tasks : copy_complete}
      })
    }).catch((error) => {
      console.log(error);
    })

  }

  httpDeleteHandle(request){

    axios.delete(this.api_base_uri, request)
    .then(response => {
      var iscomplete = response.data.DeletedTask['complete']
      var id = response.data.DeletedTask['id']
      this.setState((prevState, props) => {
        
        var respondObj = response.data.DeletedTask[0]
        if (respondObj.complete){
          var copy = prevState.complete_tasks.slice()
          delete copy[respondObj.id]
          return {complete_tasks : copy}
        } else {
          var copy = prevState.incomplete_tasks.slice()
          delete copy[respondObj.id]
          return {incomplete_tasks : copy}
        }
      })
    })
  }

  render () {
    return (
      <div className='button__container'>
        <AddToDoField add_event_handle={this.httpPostHandle}/>
        <ListBlock todolist={this.state.complete_tasks} removeHandle={this.httpDeleteHandle} completeHandle={this.httpPutHandle}/>
        <ListBlock todolist={this.state.incomplete_tasks} removeHandle={this.httpDeleteHandle} completeHandle={this.httpPutHandle}/>
      </div>
    )
  }
}
export default App