import React from 'react';
import Appointment from '../components/Appointment'

class AppointmentsContainer extends React.Component {
    
    renderAppointments = () => {
        // console.log(this.props)


        //define whether findLeadName props exist, to apply conditional rendering of appointments to Home Page, and to Lead Activity Page    
                if (this.props.findLeadName) {
                    if (this.props.appointments === undefined || this.props.appointments === null) return
                    return this.props.appointments.map(appointment => <Appointment 
                        key={appointment.id} 
                        appointment={appointment}
                        findLeadName={this.props.findLeadName}/>)
    
                } else if (this.props.clickedLeadAppointments){
                    return this.props.clickedLeadAppointments.map(appointment => <Appointment 
                        key={appointment.id} 
                        appointment={appointment}/>)
                }
    }

    render() { 
        return ( 
            <div className="appointments-container">
                <h1>Appointments</h1>
                {this.renderAppointments()}
            </div>
         );
    }
}
 
export default AppointmentsContainer;