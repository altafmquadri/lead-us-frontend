import React from 'react';



const Appointment = (props) => {
    const selectRender = () => {
        // console.log("i am from Appointment", props)
        
        if (props.findLeadName) {
            return (props.appointment['presentation_made?'] ? <li style={{color: 'green'}}>{`${props.appointment.title} with ${props.findLeadName(props.appointment.lead_id)}`}</li> :
            <li>{`${props.appointment.title} with ${props.findLeadName(props.appointment.lead_id)}`}</li>)
        } else {
            return (
            props.appointment['presentation_made?'] ? <h3 style={{color: 'green'}} onClick={() => props.onEditAppointmentClick(props.appointment)}>{props.appointment.title}</h3>:
            <h3  onClick={() => props.onEditAppointmentClick(props.appointment)}>{props.appointment.title}</h3>
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