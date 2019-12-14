import React from 'react';
import Navbar from './components/Navbar'
import MainContainer from './containers/MainContainer';
import NewLeadContainer from './containers/NewLeadContainer';

import {BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

const api = 'http://localhost:3000/api/v1/users'

class App extends React.Component {

  state = { 
    users: [],
    currentUser: [],
    leads: [],
    appointments: []
 }

 //triggered by new lead form
 addNewLead = (newLead) => {
    this.setState(
      {
        ...this.state, 
        leads:  [...this.state.leads, newLead] 
      }) 
     
 }

 componentDidMount() {
     return fetch(api).then(res => res.json()).then(res => this.setState(
         { 
            users: res.users,
            currentUser: res.users[0], //will have to implement some logic to get the current user  
            leads: res.users[0].leads,
            appointments: res.users[0].appointments
        }))
        
 }

  render() {
    console.log(this.state)
    return (
      <div className="main-page-container">
        <Router>
          <div>
              <Navbar />

              <Switch>
                <Route path="/new" render={(routerProps) => <NewLeadContainer 
                addNewLead={this.addNewLead} 
                {...routerProps}/>}></Route> 


                <Route exact path="/" render={(routerProps) =>  <MainContainer 
                leads={this.state.leads} 
                appointments={this.state.appointments}
                {...routerProps}/>}></Route>

              </Switch>
            </div>
          </Router>
        </div>
    );
  }
}

export default withRouter(App);
