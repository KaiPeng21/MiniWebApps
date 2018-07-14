
import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

import AddToDoField from './Components/AddToDoField.js'
import ListBlock from './Components/ListBlock.js'
import { Tabs, Tab } from 'react-bootstrap';

class App extends Component {

  constructor(props){
    super(props)

    this.api_base_uri = 'http://localhost:5000/task'

    // initialize complete and incomplete tasks as associative arrays
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

  // fetch the complete/incomplete tasks from the database through an http get request
  // right before the App component is mounted
  componentWillMount(){
    this.httpGetHandle('complete_tasks', '?complete=true')
    this.httpGetHandle('incomplete_tasks', '?complete=false')
  }

  // send a get request to the api
  // response_state_var : the state variable (complete_tasks or incomplete tasks) that holds the get request response
  // query : http get request query
  httpGetHandle(response_state_var, query){

   axios.get(this.api_base_uri + query)
   .then(response => { 
    
    // format the get request respoonse as in an associative array using the reduce method
    // []
    // [{'id01' : object01}]
    // [{'id01' : object01}, {'id02' : object02}]
    // ....
      var associativeTask = response.data.Tasks.reduce((accum, curr) => { 
        accum[curr['id']] = curr;
        return accum;
      }, [])

      // update the state variable
      this.setState({
        [response_state_var] : associativeTask
      })

    }).catch((error) => {
     console.log(error)
   })

  }

  // send a post request to the api
  httpPostHandle(request){

    /*
    // Example using the post request
    axios.post('http://localhost:5000/task', {'title':'aws study', 'descrioption' : 'studying aws', 'complete' : false})
    .then(response => console.log(response))
    */

    axios.post(this.api_base_uri, request)
    .then(response => {

      // update the state variable (a new set of data has been inserted to the incomplete list)
      this.setState((prevState, props) => {
        var copy = prevState.incomplete_tasks.slice()
        copy[response.data.InsertedData['id']] = response.data.InsertedData
        return {incomplete_tasks : copy}
      })

    }).catch((error) => {
      console.log(error);
    })
  }

  // send an http put request to the api
  httpPutHandle(request){
    
    axios.put(this.api_base_uri, request)
    .then(response => {

      var modifiedObj = response.data.ModifiedData[0]
      
      // update the state variables that hold the complete/incomplete tasks
      this.setState((prevState, props) => {
        var copy_complete = prevState.complete_tasks.slice()
        var copy_incomplete = prevState.incomplete_tasks.slice()

        // if a task is to be completed, remove it from the incomplete list, and add to the complete list
        // and vice versa
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

  // send an http delete request to the api
  httpDeleteHandle(request){

    axios.delete(this.api_base_uri, request)
    .then(response => {

      this.setState((prevState, props) => {
        
        // delete the object from either the complete list or the incomplete list
        var respondObj = response.data.DeletedTask[0]
        var copy = []
        if (respondObj.complete){
          copy = prevState.complete_tasks.slice()
          delete copy[respondObj.id]
          return {complete_tasks : copy}
        } else {
          copy = prevState.incomplete_tasks.slice()
          delete copy[respondObj.id]
          return {incomplete_tasks : copy}
        }
      })
    })
  }

  // render the app front end
  render () {
    return (
      <div>
        
        <AddToDoField add_event_handle={this.httpPostHandle}/>
        <div style={{marginLeft : '20px', marginRight : '20px'}}>
        <Tabs defaultActiveKey={1} id="tabs" animation={false} >
          <Tab eventKey={1} title="Incomplete Task">
            <ListBlock todolist={this.state.incomplete_tasks} removeHandle={this.httpDeleteHandle} completeHandle={this.httpPutHandle}/>      
          </Tab>
          <Tab eventKey={2} title="Complete Task">
            <ListBlock todolist={this.state.complete_tasks} removeHandle={this.httpDeleteHandle} completeHandle={this.httpPutHandle}/>
          </Tab>
        </Tabs>
        </div>
      </div>
    )
  }
}
export default App