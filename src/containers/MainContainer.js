import React from 'react';
import LeadsContainer from './LeadsContainer';
import AppointmentsContainer from './AppointmentsContainer';
import './MainContainer.css'



const MainContainer = (props) =>  {

    return ( 
        <div className="main-container">
            <LeadsContainer leads={props.leads} {...props} />
            <AppointmentsContainer appointments={props.appointments}/>
        </div> 
        );
    
}
 
export default MainContainer;