import React from 'react';
import './LeadActivityContainer.css'
import ShowLeadContainer from './ShowLeadContainer';
import CallsContainer from './CallsContainer';
import CallForm from '../components/CallForm'
import AppointmentsContainer from './AppointmentsContainer';
import AppointmentForm from '../components/AppointmentForm'

const api = 'http://localhost:3000/api/v1/calls'

class LeadActivityContainer extends React.Component {
    state = { 

        //for both
        user_id: 1, //hard coded for now
        lead_id: this.props.lead.id,

        //for calls
        callForm: false,
        appointmentForm: true,
        call_status: "No Answer",
        'appointment_made?': false,
        'archive_lead?': false,

        //for appointments
        title: "",
        date: "",
        start_time: "",
        end_time: "",
        'presentation_made?': false,
        'sales_made?': false

     }

     setInitialState = () => {
         this.setState({ 
            user_id: 1, //hard coded for now
            lead_id: this.props.lead.id,
            callForm: false,
            appointmentForm: false,
            call_status: "No Answer",
            'appointment_made?': false,
            'archive_lead?': false  
        });
     }

     onPhoneClick = () => {
         this.setState(
             { callForm: !this.state.callForm,
                lead_id: this.props.lead.id
            });
     }

    onFormChange = (e) => {
        this.setState({ call_status: e.target.value  });
    }

    onToggleArchive = () => {
        this.setState({ 'archive_lead?': !this.state['archive_lead?']  });
    }

    onToggleAppointment = () => {
        this.setState({ 'appointment_made?': !this.state['appointment_made?']  });
    }

    onTogglePresentation = () => {
        this.setState({ 'presentation_made?': !this.state['presentation_made?']  });
    }

    onFormSubmission = (e) => {
        e.preventDefault()

        if (this.state['appointment_made?']=== false) {
            fetch(api, {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json',
                    Accepts: 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    lead_id: this.state.lead_id,
                    call_status: this.state.call_status,
                    'appointment_made?': this.state['appointment_made?'],
                    'archive_lead?': this.state['archive_lead?']
                })
            }).then(resp => resp.json()).then(call => this.props.addNewCall(call))
            this.setInitialState()
        }
    }

    partialFormHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value  });
    }

    render() { 
        // console.log('I am from props in leadActCont',this.props)
        return ( 
            <div className="activity-show-page">
                <div className="lead-show-page">
                    <ShowLeadContainer lead={this.props.lead} onPhoneClick={this.onPhoneClick}/>
                    <CallsContainer calls={this.props.calls} />
                    <AppointmentsContainer clickedLeadAppointments={this.props.clickedLeadAppointments}/>
                </div>
                {this.state.callForm ? <CallForm calls={this.props.calls} 
                formData={this.state}
                onToggleArchive={this.onToggleArchive}
                onFormSubmission={this.onFormSubmission}
                onToggleAppointment={this.onToggleAppointment}
                onFormChange={this.onFormChange}/> : null }

                {this.state.appointmentForm ? <AppointmentForm formData={this.state}
                partialFormHandler={this.partialFormHandler}
                onTogglePresentation={this.onTogglePresentation}
                /> : null}
            </div>
                
            );
        }
    }
    
    export default LeadActivityContainer;
   