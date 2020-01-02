import React from 'react';
import LeadsContainer from './LeadsContainer';
import AppointmentsContainer from './AppointmentsContainer';
import './MainContainer.css'
import AppointmentCalendar from '../components/AppointmentCalendar';



const MainContainer = (props) =>  {
    return ( 
        <div>    
            <div className="main-container">
                <LeadsContainer leads={props.leads} {...props} />
                <AppointmentsContainer appointments={props.appointments} findLeadName={props.findLeadName}/>
            </div> 
        
                <AppointmentCalendar appointments={props.appointments} findLeadName={props.findLeadName}/>
            
        </div>
        )
    
}

export default MainContainer;