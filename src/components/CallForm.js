import React from 'react';
import './ActivityForms.css'

const CallForm = (props) => {
    return (
        
        <div className="call-form-div">
        
            <form className="new-call-form"
                onSubmit={props.onFormSubmission}>

            <div className="label-input-call">
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
            
            <div className="label-input-call-radio">
                <label>Archive Lead:</label>
                    <input 
                        onChange={props.onToggleArchive}
                        type="radio" 
                        name="archive_lead?" 
                        value={props.formData['archive_lead?']} 
                        checked={!!props.formData['archive_lead?'] ? true : null}/>True
            

                    <input 
                        onChange={props.onToggleArchive}
                        type="radio" 
                        name="archive_lead?" 
                        value={props.formData['archive_lead?']} 
                        checked={!!props.formData['archive_lead?'] ? null : true} />False
            </div>

            <div className="label-input-call-radio">
                <label>Appointment Made:</label>
                    <input 
                        onChange={props.onToggleAppointment}
                        type="radio"
                        name="appointment_made?" 
                        value={props.formData['appointment_made?']} 
                        checked={!!props.formData['appointment_made?'] ? true : null}/>True
        
                    <input 
                        onChange={props.onToggleAppointment}
                        type="radio" 
                        name="appointment_made?" 
                        value={props.formData['appointment_made?']} 
                        checked={!!props.formData['appointment_made?'] ? null : true}/>False
            </div>

            <div className="submit-call">
                <input className="submit-btn-call" type="submit" value="Submit" />
            </div>
            </form>
        </div>
    )
}

export default CallForm;