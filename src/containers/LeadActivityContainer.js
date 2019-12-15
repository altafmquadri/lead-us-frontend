import React from 'react';
import './LeadActivityContainer.css'
import ShowLeadContainer from './ShowLeadContainer';
import CallsContainer from './CallsContainer';
import CallForm from '../components/CallForm'


class LeadActivityContainer extends React.Component {
    state = { 
        callForm: false,
        appointmentForm: false
     }

     onPhoneClick = () => {
         this.setState({ callForm: !this.state.callForm });
     }

    render() { 
        console.log(this.state.callForm)
        return ( 
            <div className="activity-show-page">
                <div className="lead-show-page">
                    <ShowLeadContainer lead={this.props.lead} onPhoneClick={this.onPhoneClick}/>
                    <CallsContainer calls={this.props.calls}/>
                </div>
                {this.state.callForm ? <CallForm /> : null }
            </div>
            );
        }
    }
    
    export default LeadActivityContainer;
    //console.log("this is the current object", this.props.lead)