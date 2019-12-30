import React from 'react';

const Appointment = (props) => {
    const selectRender = () => {
        
        if (props.findLeadName) {
            return (props.appointment['presentation_made?'] ? <li style={{color: 'green'}}>{`${props.appointment.title} with ${props.findLeadName(props.appointment.lead_id)}`}<hr></hr></li> :
            <li>{`${props.appointment.title} with ${props.findLeadName(props.appointment.lead_id)}`}<hr></hr></li>)
        } else {
            return (
            props.appointment['presentation_made?'] ? <h3 className="special" style={{color: 'green'}} onClick={() => props.onEditAppointmentClick(props.appointment)}>{props.appointment.title}<hr></hr></h3>:
            <h3 className="special" onClick={() => props.onEditAppointmentClick(props.appointment)}>{props.appointment.title}<hr></hr></h3>
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