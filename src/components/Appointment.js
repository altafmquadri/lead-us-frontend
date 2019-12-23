import React from 'react';


const Appointment = (props) => {
    const selectRender = () => {
        // console.log("i am from Appointment", props)
        return props.findLeadName ? <li>{`${props.appointment.title} with ${props.findLeadName(props.appointment.lead_id)}`}</li> : <h3>{props.appointment.title}</h3>
    }
    return (
        <div className="appointment">
            {selectRender()}
        </div>
    )
}

export default Appointment;