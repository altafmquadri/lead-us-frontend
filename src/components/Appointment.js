import React from 'react';
import AppointmentUpdateForm from '../components/AppointmentUpdateForm'



const Appointment = (props) => {
    const selectRender = () => {
        // console.log("i am from Appointment", props)
        if (props.findLeadName) {
            return <li>{`${props.appointment.title} with ${props.findLeadName(props.appointment.lead_id)}`}</li>
        } else {
            return (
            <h3>{props.appointment.title}</h3>
            )
        }
    }
    return (
        <div className="appointment">
            {selectRender()}
        </div>
    )
}

export default Appointment;