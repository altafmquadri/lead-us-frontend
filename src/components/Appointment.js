import React from 'react';


const Appointment = (props) => {
    return (
        <div className="appointment">
         <li>{`${props.appointment.title} with ${props.findLeadName(props.appointment.lead_id)}`}</li>   
         </div>
         
    )
}

export default Appointment;