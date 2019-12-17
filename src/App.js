import React from 'react';
import Navbar from './components/Navbar'
import MainContainer from './containers/MainContainer';
import NewLeadContainer from './containers/NewLeadContainer';

import {Switch, Route, withRouter } from "react-router-dom";
import LeadActivityContainer from './containers/LeadActivityContainer';
import SignupForm from './components/SignupForm';

const api = 'http://localhost:3000/api/v1/users'

class App extends React.Component {

  state = { 
    users: [],
    currentUser: [],
    leads: [],
    appointments: [],
    calls: [],
    clickedLead: [],
    clickedLeadCalls: [],
    clickedLeadAppointments: [],
    loading: true
 }

 findLeadName = (id) => {
   let name
   let lead = this.state.leads.find(lead => lead.id === id)
   name = `${lead.first_name} ${lead.last_name}`
   return name
 }

 //triggered by new lead form
 addNewLead = (newLead) => {
    this.setState(
      {
        ...this.state, 
        leads:  [...this.state.leads, newLead]
        
      }) 
 }

 addNewCall = (newCall) => {
   this.setState(
     {
       ...this.state,
       calls: [...this.state.calls, newCall],
       clickedLeadCalls: [...this.state.clickedLeadCalls, newCall]  
    });
 }

 addNewAppointment = (newAppointment) => {
  this.setState(
    {
      ...this.state,
      appointments: [...this.state.appointments, newAppointment],
      clickedLeadAppointments: [...this.state.clickedLeadAppointments, newAppointment]  
   });
 }

 //written for the cancel button on appointment form
 editCallNoApp = (call) => {
   this.setState(
     { 
        ...this.state,
        calls: [...this.state.calls.map(stateCall => {
            if (stateCall.id === call.id) {
              return call
            } else {
              return stateCall
            }
        })],  
        clickedLeadCalls: [...this.state.clickedLeadCalls.map(stateCall => {
          if (stateCall.id === call.id) {
            return call
          } else {
            return stateCall
          }
      })]
    });
 }

 componentDidMount() {
     return fetch(api).then(res => res.json()).then(res => this.setState(
         { 
            users: res.users,
            currentUser: res.users[0], //will have to implement some logic to get the current user  
            leads: res.users[0].leads,
            appointments: res.users[0].appointments,
            calls: res.users[0].calls,
            clickedLead: [],
            clickedLeadCalls: [],
            clickedLeadAppointments: [],
            loading: false //added for purpose of establishing dynamic routes
        }))
        
 }

 //to point us to the lead show page
 onLeadClick = (leadData) => {
  //  console.log("i am the clicked lead", leadData.lead)
   this.setState(
     { 
       clickedLead: leadData.lead,
       clickedLeadCalls: this.state.calls.filter(calls => calls.lead_id === leadData.lead.id), 
       clickedLeadAppointments: this.state.appointments.filter(appointments => appointments.lead_id === leadData.lead.id)
      }, () => {
     this.props.history.push(`/leads/${leadData.lead.id}`)
   }) 
 }

  render() {
    // console.log("i am clicked lead calls",this.state.clickedLeadCalls)
    if (this.state.loading) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="main-page-container">
          <div>
              <Navbar />
              <Switch>

                <Route path="/leads/:id" render={(routerProps) => <LeadActivityContainer 
                lead={this.state.clickedLead}
                calls={this.state.clickedLeadCalls}
                clickedLeadAppointments={this.state.clickedLeadAppointments}
                addNewCall={this.addNewCall}
                addNewAppointment={this.addNewAppointment}
                editCallNoApp={this.editCallNoApp}
                {...routerProps}/> }></Route>

                <Route path="/new" render={(routerProps) => <NewLeadContainer 
                addNewLead={this.addNewLead} 
                {...routerProps}/>}></Route> 

                <Route path="/signup" component={SignupForm}></Route>

                <Route exact path="/" render={(routerProps) =>  <MainContainer 
                leads={this.state.leads} onLeadClick={this.onLeadClick}
                appointments={this.state.appointments} findLeadName={this.findLeadName}
                {...routerProps}/>}></Route>

              </Switch>
            </div>
        </div>
    );
  }
}

export default withRouter(App);
