import React from 'react';
import Appointment from '../components/Appointment'

class AppointmentsContainer extends React.Component {
    
    renderAppointments = () => {
        //define hear whether the props exist if they do, do map
        //if not do filter
        console.log(this.props)
        if (this.props.findLeadName) {
            return this.props.appointments.map(appointment => <Appointment key={appointment.id} 
                appointment={appointment}
                findLeadName={this.props.findLeadName ? this.props.findLeadName : null}/>)
        } else if (this.props.clickedLeadAppointments){
            return this.props.clickedLeadAppointments.map(appointment => <Appointment key={appointment.id} 
                appointment={appointment}/>)
        }


        // return this.props.appointments.map(appointment => <Appointment key={appointment.id} 
        //     appointment={appointment}
        //     findLeadName={this.props.findLeadName ? this.props.findLeadName : null}/>)
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