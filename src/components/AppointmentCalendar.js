import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";


const localizer = momentLocalizer(moment)
const renderMyAppointments = (props) => {


    if (props.appointments === undefined || props.appointments === null) return

    return props.appointments.map(event => (
      
      {
        title: event.title + ' with ' + props.findLeadName(event.lead_id),
        start: new Date(new Date(event.start_time).getFullYear(), new Date(event.start_time).getMonth(), new Date(event.start_time).getDate(), new      Date(event.start_time).getHours(), new Date(event.start_time).getMinutes()),
        end: new Date( new Date(event.end_time).getFullYear(), new Date(event.end_time).getMonth(), new Date(event.end_time).getDate(), new Date        (event.end_time).getHours(), new Date(event.end_time).getMinutes())
    }))
  }

  
  const AppointmentCalendar = props => (  

    <div className="appointment-calendar" style={{height: "55vh", width:"75vw", padding: '15px', margin: '15px auto'}}>
        {/* {console.log(props.appointments)} */}

      <Calendar
        localizer={localizer}
        events={renderMyAppointments(props)}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={e => alert(e.title)}
        /> 
    </div>
    
  )
  
  export default AppointmentCalendar;