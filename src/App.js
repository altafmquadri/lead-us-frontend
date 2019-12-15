import React from 'react';
import Navbar from './components/Navbar'
import MainContainer from './containers/MainContainer';
import NewLeadContainer from './containers/NewLeadContainer';

import {Switch, Route, withRouter } from "react-router-dom";
import ShowLeadContainer from './containers/ShowLeadContainer';

const api = 'http://localhost:3000/api/v1/users'

class App extends React.Component {

  state = { 
    users: [],
    currentUser: [],
    leads: [],
    appointments: [],
    clickedLead: [],
    loading: true
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
            appointments: res.users[0].appointments,
            clickedLead: [],
            loading: false //added for purpose of establishing dynamic routes
        }))
        
 }

 //to point us to the lead show page
 onLeadClick = (leadData) => {
  //  console.log("i am the clicked lead", leadData.lead)
   this.setState({ clickedLead: leadData.lead  }, () => {
     this.props.history.push(`/leads/${leadData.lead.id}`)
   }) 
 }

  render() {

    if (this.state.loading) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="main-page-container">
          <div>
              <Navbar />
              <Switch>
                
                <Route path="/leads/:id" render={(routerProps) => <ShowLeadContainer 
                lead={this.state.clickedLead}
                {...routerProps}/> }></Route>

                <Route path="/new" render={(routerProps) => <NewLeadContainer 
                addNewLead={this.addNewLead} 
                {...routerProps}/>}></Route> 

                <Route path="/" render={(routerProps) =>  <MainContainer 
                leads={this.state.leads} onLeadClick={this.onLeadClick}
                appointments={this.state.appointments}
                {...routerProps}/>}></Route>

              </Switch>
            </div>
        </div>
    );
  }
}

export default withRouter(App);
