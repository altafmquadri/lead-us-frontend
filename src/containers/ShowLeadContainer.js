import React from 'react';
import LeadDetails from '../components/LeadDetails'

const ShowLeadContainer = (props) => {

    return (
    
        <div className="lead-display">
            <LeadDetails lead={props.lead} onPhoneClick={props.onPhoneClick}/>
        </div>
    )
}
export default ShowLeadContainer;