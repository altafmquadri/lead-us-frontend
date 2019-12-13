import React from 'react';
import Appointment from '../components/Appointment'

class AppointmentsContainer extends React.Component {
    
    renderLeads = () => {
        return this.props.appointments.map(appointment => <Appointment key={appointment.id} appointment={appointment}/>)
    }


    render() { 
        return ( 
            <div className="appointments-container">
                <h1>appointments</h1>
            </div>
         );
    }
}
 
export default AppointmentsContainer;