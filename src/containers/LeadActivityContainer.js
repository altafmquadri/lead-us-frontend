import React from 'react';
import './LeadActivityContainer.css'
import ShowLeadContainer from './ShowLeadContainer';
import CallsContainer from './CallsContainer';
import CallForm from '../components/CallForm'


class LeadActivityContainer extends React.Component {
    state = { 
        user_id: 1, //hard coded for now
        lead_id: this.props.lead.id,
        callForm: false,
        appointmentForm: false,
        call_status: "",
        'appointment_made?': false,
        'archive_lead?': false
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

    onFormSubmission = (e) => {
        e.preventDefault()
        console.log(this.state)
    }

    render() { 
        console.log('I am from props in leadActCont',this.props)
        return ( 
            <div className="activity-show-page">
                <div className="lead-show-page">
                    <ShowLeadContainer lead={this.props.lead} onPhoneClick={this.onPhoneClick}/>
                    <CallsContainer calls={this.props.calls}/>
                </div>
                {this.state.callForm ? <CallForm calls={this.props.calls} 
                formData={this.state}
                onToggleArchive={this.onToggleArchive}
                onFormSubmission={this.onFormSubmission}
                onToggleAppointment={this.onToggleAppointment}
                onFormChange={this.onFormChange}/> : null }
            </div>
            );
        }
    }
    
    export default LeadActivityContainer;
    //console.log("this is the current object", this.props.lead)