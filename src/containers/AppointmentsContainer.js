import React from 'react';
import Appointment from '../components/Appointment'

class AppointmentsContainer extends React.Component {
    
    renderAppointments = () => {
        return this.props.appointments.map(appointment => <Appointment key={appointment.id} 
            appointment={appointment}
            findLeadName={this.props.findLeadName}/>)
    }


    render() { 
        return ( 
            <div className="appointments-container">
                <h1>appointments</h1>
                {this.renderAppointments()}
            </div>
         );
    }
}
 
export default AppointmentsContainer;