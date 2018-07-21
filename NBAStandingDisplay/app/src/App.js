import React, { Component } from 'react';
import './App.css';
import fetchJsonp from 'fetch-jsonp';
import {Tabs, Tab} from 'react-bootstrap';
import StandingTable from './Component/StandingTable';

const nbaStandingBaseURL = 'http://stats.nba.com/stats/scoreboard/?LeagueID=00&DayOffset=0&GameDate=';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      isLoading : true,
      heading : [],
      westernConference : [[]],
      easternConference : [[]]
    }

    this.sortHandle = this.sortHandle.bind(this)
  }


  sortHandle(conference, columnID){
    if (conference === 'WEST'){
      this.setState((prevState, props) => {
        var copy = prevState.westernConference.slice()
        copy.sort((a, b) => {
          var comp = 0
          var x = a
          var y = b

          // sort by float or int value
          if (!isNaN(a[columnID].toString())){
            comp =  x[columnID] - y[columnID]
          // sort by win-lose 
          } else if (a[columnID].toString().includes("-")){
            comp = x[columnID].split("-")[0] - y[columnID].split("-")[0]
          // sort alphabetically
          } else {
            comp =  x[columnID].toString().toUpperCase().localeCompare(y[columnID].toString().toUpperCase())
          }
          
          // if the value is equal, sort by rank
          if (comp === 0){
            comp = x[0] - y[0]
          }
          return comp
        })

        return {
          westernConference : copy
        }
      })
    } else {
      this.setState((prevState, props) => {
        var copy = prevState.easternConference.slice()
        copy.sort((a, b) => {
          var comp = 0
          var x = a
          var y = b

          // sort by float or int value
          if (!isNaN(a[columnID].toString())){
            comp =  x[columnID] - y[columnID]
          // sort by win-lose 
          } else if (a[columnID].toString().includes("-")){
            comp = x[columnID].split("-")[0] - y[columnID].split("-")[0]
          // sort alphabetically
          } else {
            comp =  x[columnID].toString().toUpperCase().localeCompare(y[columnID].toString().toUpperCase())
          }
          
          // if the value is equal, sort by rank
          if (comp === 0){
            comp = x[0] - y[0]
          }
          return comp
        })

        return {
          easternConference : copy
        }
      })
    }
  }

  componentDidMount(){
    var today = new Date()
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear()

    var APIEndPoint = nbaStandingBaseURL + `${mm}/${dd}/${yyyy}`;

    fetchJsonp(APIEndPoint)
    .then((response) => response.json())
    .then((data) => {

      data.resultSets.forEach((val) => {
        if (val.name === 'EastConfStandingsByDay'){
          this.setState({
            heading : ['RANK', ...val.headers.slice(5)],
            easternConference : val.rowSet.map((item, ind) => [ind+1, ...item.slice(5)])
          })
        } else if (val.name === 'WestConfStandingsByDay'){
          this.setState({
            westernConference : val.rowSet.map((item, ind) => [ind+1, ...item.slice(5)])
          })
        }
      })

      this.setState({
        isLoading : false
      })

    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    if (this.state.isLoading){
      <p>Loading...</p>
    }

    return (
      <div className="App" style={{margin : '20px'}}>
        <h1>NBA Standing</h1><br/>
        <Tabs defaultActiveKey={1} animation={false} id='conference-tabs'>
          <Tab eventKey={1} title='EAST'>
            <StandingTable conference='EAST' heading={this.state.heading} body={this.state.easternConference} sortHandle={this.sortHandle}/>
          </Tab>
          <Tab eventKey={2} title='WEST'>
            <StandingTable conference='WEST' heading={this.state.heading} body={this.state.westernConference} sortHandle={this.sortHandle}/>
          </Tab>
        </Tabs>
              </div>
    );
  }
}

export default App;
