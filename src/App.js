import React from 'react';
import Navbar from './components/Navbar'
import MainContainer from './containers/MainContainer';
import NewLeadContainer from './containers/NewLeadContainer';
import LeadActivityContainer from './containers/LeadActivityContainer';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Profile from './containers/Profile'
import MetricsContainer from './containers/MetricsContainer'

import {Switch, Route, withRouter } from "react-router-dom";

const api = 'http://localhost:3000/api/v1/auto_login'

class App extends React.Component {

  state = { 
    currentUser: null,
    leads: [],
    calls: [],
    appointments: [],
    clickedLead: [],
    clickedLeadCalls: [],
    clickedLeadAppointments: [],
    archived: [],
    appointmentSales: [],
    sales: [],
    pastClients: [],
    loading: true
}


setCurrentUser = (user) => {
  this.setState(
    { 
      currentUser: user,
      leads: user.leads.filter(leads => !leads['lead_archived?'] && !leads['sale_made?']),
      archived: user.leads.filter(leads => leads['lead_archived?']),
      pastClients: user.leads.filter(leads => leads['sale_made?']),
      calls: user.calls,

      /* had to write a different filter for appointments when a lead is archived
      taking all leads and filtering them for archived leads, mapping their ids
      to check that appointment with an archived lead id is not included among them
      */
      appointments: user.appointments
        .filter(appointment => (!(user.leads.filter(leads => leads['lead_archived?'])
        .map(archiveLead => archiveLead.id)).includes(appointment.lead_id))), 
      
        appointmentSales: user.appointments.filter(appointments => appointments['made_sale?']),
      sales: user.sales
    }, () => {
      localStorage.user_id = user.id
      this.props.history.push('/')
    })
}

logoutUser = () => {
  this.setState({ currentUser: null  }, () => {
    localStorage.removeItem('user_id')
    localStorage.clear()
    this.props.history.push('/login')
  })
}

//Functions written to add lead activity ***************************************************************************************

findLeadName = (id) => {
  if (id === undefined) return
  let name, lead
  let found = this.state.leads.find(lead => lead.id === id)
  found ? lead = this.state.leads.find(lead => lead.id === id)
    : !found ? lead = this.state.pastClients.find(lead => lead.id === id)
    : lead = this.state.archived.find(lead.id === id)

  if (!lead) return
  name = `${lead.first_name} ${lead.last_name}`
  return name
}

//to point us to the lead show page
  onLeadClick = (leadData) => {

    if (leadData.lead.id === undefined) return  //not sure i need this condition, bc setstate was wrong for archive lead
    this.setState(
      { 
        clickedLead: leadData.lead,
        clickedLeadCalls: this.state.calls.filter(calls => calls.lead_id === leadData.lead.id), 
        clickedLeadAppointments: this.state.appointments.filter(appointments => appointments.lead_id === leadData.lead.id)
      }, () => {
      this.props.history.push(`/leads/${leadData.lead.id}`)
    }) 
  }
  //triggered by new lead form
  addNewLead = (newLead) => {
    this.setState (
      {
        ...this.state, 
        leads:  [...this.state.leads, newLead]
        
      }) 
  }

  archiveLead = (lead) => {
    this.setState(
      {
        ...this.state,
        leads: [...this.state.leads.filter(stateLead => stateLead.id !== lead.id )],
        archived: [...this.state.archived, lead] 
      }, () => this.setState(
        { 
          appointments: [...this.state.appointments.filter(appointment => (!(this.state.archived.map(archiveLead => archiveLead.id)).includes(appointment.lead_id)))] 
        }))
  }




  //triggered by user clicking on the phone number
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

  editTheAppointment = (appointment) => {
    this.setState(
      { 
        ...this.state,
        appointments: [...this.state.appointments.map(stateAppointment => {
          if (stateAppointment.id === appointment.id) {
            return appointment
          } else {
            return stateAppointment
          }
        })],
        clickedLeadAppointments: [...this.state.clickedLeadAppointments.map(stateAppointment => {
          if (stateAppointment.id === appointment.id) {
            return appointment
          } else {
            return stateAppointment
          }
        })]
      }, () => this.setState(
        { 
          ...this.state,
          // appointments: [...this.state.appointments.filter(appointments => !appointments['made_sale?'])],
          appointmentSales: [...this.state.appointments.filter(appointments => appointments['made_sale?'])]  
        }))
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

  addSale = (sale) => {
    this.setState(
      { 
        ...this.state,
        sales: [...this.state.sales, sale],
        leads: [...this.state.leads.filter(leads => !leads['sale_made?'])] 
      })
  }

  addPastClient = (lead) => {
    this.setState(
      {   
        pastClients: [...this.state.pastClients, lead],
        leads: [...this.state.leads.filter(stateLeads => stateLeads.id !== lead.id)]
      })
  }

 //End of Functions written to add lead activity ***********************************************************************************

componentDidMount() {
  //setup for auto_login

  const user_id = localStorage.user_id
  if (user_id) {
    
    fetch(api, {
      headers: {
        "Authorization": user_id
      }
    }).then(res => res.json()).then(user => this.setCurrentUser(user))
  }
  this.setState(
    { 
      loading: false, 
      clickedLead: [],
      clickedLeadCalls: [],
      clickedLeadAppointments: [],
      appointments: [...this.state.appointments.filter(appointment => (!(this.state.archived.map(archiveLead => archiveLead.id)).includes(appointment.lead_id)))]
    })

  
    
}

  render() {
    // this.testFunction()
    // console.log("i am clicked lead calls",this.state.clickedLeadCalls)
    console.log(this.state)
    // console.log(this.state.currentUser.leads)
    // console.log(this.state.appointments)
    // console.log(this.state)
    // console.log(this.state.leads)
    // console.log(this.state.archived)
    // console.log(this.props, 'I am in App')

    if (this.state.loading) {
      return <h1>Loading...</h1>
    }

    return (
      <div className="main-page-container">
          <div>
              <Navbar currentUser={this.state.currentUser} logoutUser={this.logoutUser}/>

              <Switch>
              
                <Route path="/leads/:id" render={(routerProps) => <LeadActivityContainer 
                currentUser={this.state.currentUser}
                lead={this.state.clickedLead}
                calls={this.state.clickedLeadCalls}
                clickedLeadAppointments={this.state.clickedLeadAppointments}
                addNewCall={this.addNewCall}
                addNewAppointment={this.addNewAppointment}
                editCallNoApp={this.editCallNoApp}
                editTheAppointment={this.editTheAppointment}
                addSale={this.addSale}
                archiveLead={this.archiveLead}
                addPastClient={this.addPastClient}
                {...routerProps}/> }></Route>

                <Route path="/profile" render={(routerProps) => 
                <Profile {...routerProps} 
                currentUser={this.state.currentUser}
                archived={this.state.archived}/>}></Route>


                <Route path="/metrics" render={(routerProps) => <MetricsContainer
                  {...routerProps} 
                  currentUser={this.state.currentUser}
                  sales={this.state.sales}
                  appointments={this.state.appointments}/>}></Route>

                <Route path="/new" render={(routerProps) => <NewLeadContainer
                currentUser={this.state.currentUser} 
                addNewLead={this.addNewLead} 
                {...routerProps}/>}></Route> 

                <Route path="/signup" render={(routerProps) => <SignupForm {...routerProps} setCurrentUser={this.setCurrentUser}/>}></Route>

                <Route path="/login" render={(routerProps) => <LoginForm {...routerProps} setCurrentUser={this.setCurrentUser}/>}></Route>

                <Route exact path="/" render={(routerProps) =>  <MainContainer 
                leads={this.state.leads} onLeadClick={this.onLeadClick} currentUser={this.state.currentUser}
                appointments={this.state.appointments} findLeadName={this.findLeadName}
                {...routerProps}/>}></Route>

              </Switch>
            </div>
        </div>
    );
  }
}

export default withRouter(App);
