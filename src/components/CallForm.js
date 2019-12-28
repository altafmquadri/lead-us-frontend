import React from 'react';
import './CallForm.css'

const CallForm = (props) => {
    // console.log(props)
    return (
        <div className="parent-call-form">
        <div className="call-form-div">
        
            <form className="new-call-form"
                onSubmit={props.onFormSubmission}>

            <div className="label-input">
                <label>Call Status:</label> 
                    <select 
                        value={props.call_status} 
                        onChange={props.onFormChange}
                        name="call_status">
                        <option defaultValue="No Answer" >No Answer</option>
                        <option value="Left Message">Left Message</option>
                        <option value="Call Again">Call Again</option>
                        <option value="Booked Appointment">Booked Appointment</option>
                    </select>
            </div>        
            
            <div className="label-input">
                <label>Archive Lead:</label>
                    <input 
                        onChange={props.onToggleArchive}
                        type="radio" 
                        name="archive_lead?" 
                        value={props.formData['archive_lead?']} 
                        checked={!!props.formData['archive_lead?'] ? true : null}/>True
            </div>

                <div className="label-input">
                    <input 
                        onChange={props.onToggleArchive}
                        type="radio" 
                        name="archive_lead?" 
                        value={props.formData['archive_lead?']} 
                        checked={!!props.formData['archive_lead?'] ? null : true} />False
                </div>

            <div className="label-input">
                <label>Appointment Made:</label>
                    <input 
                        onChange={props.onToggleAppointment}
                        type="radio"
                        name="appointment_made?" 
                        value={props.formData['appointment_made?']} 
                        checked={!!props.formData['appointment_made?'] ? true : null}/>True
            </div>
            
            <div className="label-input">
                    <input 
                        onChange={props.onToggleAppointment}
                        type="radio" 
                        name="appointment_made?" 
                        value={props.formData['appointment_made?']} 
                        checked={!!props.formData['appointment_made?'] ? null : true}/>False
            </div>

            <div className="submit">
                <input className="submit-btn" type="submit" value="Submit" />
            </div>
            </form>
        </div>
    </div>
    )
}

export default CallForm;