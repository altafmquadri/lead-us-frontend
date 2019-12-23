import React from 'react';
import LeadDetails from '../components/LeadDetails'

const ShowLeadContainer = (props) => {

    return (
    
        <div className="lead-display">
            <h1>Lead Details</h1>
            <LeadDetails lead={props.lead} onPhoneClick={props.onPhoneClick}/>
        </div>
    )
}
export default ShowLeadContainer;