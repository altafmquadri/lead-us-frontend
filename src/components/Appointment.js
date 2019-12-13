import React from 'react';


const Appointment = (props) => {
    return (
        <div className="appointment">
         <li>{props.appointment.title}</li>   
         </div>
         
    )
}

export default Appointment;