import React from 'react';

const AppointmentUpdateForm = (props) => {

    return (
        <div className="appointment-update">
            <form className="appointment-update-form">
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
            </form>
        </div>
    )
}

export default AppointmentUpdateForm;