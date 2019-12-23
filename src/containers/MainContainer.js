import React from 'react';
import LeadsContainer from './LeadsContainer';
import AppointmentsContainer from './AppointmentsContainer';
import './MainContainer.css'
import AppointmentCalendar from '../components/AppointmentCalendar';


const MainContainer = (props) =>  {
    // console.log(props.appointments)
    return ( 
        <div>    
            <div className="main-container">
                <LeadsContainer leads={props.leads} {...props} />
                <AppointmentsContainer appointments={props.appointments} findLeadName={props.findLeadName}/>
            </div> 
            <div>
                <h1>Calendar</h1>
                <AppointmentCalendar appointments={props.appointments} findLeadName={props.findLeadName}/>
            </div>
        </div>
        )
    
}

export default MainContainer;