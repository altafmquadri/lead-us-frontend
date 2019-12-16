import React from 'react';

const CallForm = (props) => {
    console.log(props)
    return (
        <div className="call-form">
            <br/><br/>
            <form className="new-call-form"
                onSubmit={props.onFormSubmission}>
                <label>Call Status: </label>
                    <select 
                        value={props.call_status} 
                        onChange={props.onFormChange}
                        name="call_status">
                        <option defaultValue="No Answer" >No Answer</option>
                        <option value="Left Message">Left Message</option>
                        <option value="Call Again">Call Again</option>
                    </select>
                <br/><br/>

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
                <br/><br/>

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
                <br/><br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CallForm;