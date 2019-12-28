import React from 'react';

const AppointmentForm = (props) => {

    return (
        <div className="appointment-form-div">

            <form className="new-appointment-form"
            onSubmit={props.onAppointmentSubmit}>

            <div className="label-input-appt"> 
                <label>Title:</label>
                    <input type="text" 
                    name="title"
                    value={props.formData.title}
                    onChange={props.partialFormHandler} 
                    />
            </div>

            <div className="label-input-appt"> 
                <label>Date:</label>   
                    <input type="date"
                    value={props.formData.date}
                    onChange={props.partialFormHandler} 
                    name="date" />
            </div>

            <div className="label-input-appt"> 
                <label>Start Time:</label>    
                    <input type="time"
                    value={props.formData.start_time}
                    onChange={props.partialFormHandler} 
                    name="start_time" />
            </div>

            <div className="label-input-appt"> 
                <label>End Time:</label> 
                    <input type="time"
                    value={props.formData.end_time}
                    onChange={props.partialFormHandler} 
                    name="end_time" />
            </div>

            <div className="submit-appt">
                <input className="submit-btn-appt" type="submit" value="Submit" />
                <input type="button" value="Cancel" onClick={props.noAppUpdate} />
            </div>

            </form>
        </div>
    )

}

export default AppointmentForm;