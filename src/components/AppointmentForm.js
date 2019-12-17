import React from 'react';

const AppointmentForm = (props) => {

    return (
        <div className="appointment-form">
            <br/><br/>

            <form className="new-appointment-form"
            onSubmit={props.onAppointmentSubmit}>
                <label>Title:
                    <input type="text" 
                    name="title"
                    value={props.formData.title}
                    onChange={props.partialFormHandler} 
                    /></label><br/><br/>

                <label>Date:    
                <input type="date"
                value={props.formData.date}
                onChange={props.partialFormHandler} 
                name="date" /></label><br/><br/>

                <label>Start Time:    
                <input type="time"
                value={props.formData.start_time}
                onChange={props.partialFormHandler} 
                name="start_time" /></label><br/><br/>

                <label>End Time:    
                <input type="time"
                value={props.formData.end_time}
                onChange={props.partialFormHandler} 
                name="end_time" /></label><br/><br/>

                <label>Presentation Made:</label>
                    <input 
                        onChange={props.onTogglePresentation}
                        type="radio" 
                        name="presentation_made?" 
                        value={props.formData['presentation_made?']} 
                        checked={!!props.formData['presentation_made?'] ? true : null}/>True
                    
                    <input 
                        onChange={props.onTogglePresentation}
                        type="radio" 
                        name="presentation_made?" 
                        value={props.formData['presentation_made?']} 
                        checked={!!props.formData['presentation_made?'] ? null : true}/>False
                <br/><br/>

                <label>Made Sale:</label>
                    <input 
                        onChange={props.onToggleSale}
                        type="radio" 
                        name="made_sale?" 
                        value={props.formData['made_sale?']} 
                        checked={!!props.formData['made_sale?'] ? true : null}/>True
                    
                    <input 
                        onChange={props.onToggleSale}
                        type="radio" 
                        name="made_sale?" 
                        value={props.formData['made_sale?']} 
                        checked={!!props.formData['made_sale?'] ? null : true} />False
                <br/><br/>

                <input type="submit" value="Submit" />
                <input type="button" value="Cancel" onClick={props.noAppUpdate} />

            </form>
        </div>
    )

}

export default AppointmentForm;