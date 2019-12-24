import React from 'react';

class AppointmentUpdateForm extends React.Component {

    state = {

    }

    

    render () {

        return (
            <div className="appointment-update">
                <form className="appointment-update-form">
                    <label>Presentation Made:</label>
                        <input 
                            onChange={this.props.onTogglePresentation}
                            type="radio" 
                            name="presentation_made?" 
                            value={this.props.formData['presentation_made?']} 
                            checked={!!this.props.formData['presentation_made?'] ? true : null}/>True
                        
                        <input 
                            onChange={this.props.onTogglePresentation}
                            type="radio" 
                            name="presentation_made?" 
                            value={this.props.formData['presentation_made?']} 
                            checked={!!this.props.formData['presentation_made?'] ? null : true}/>False
                    <br/><br/>
    
                    <label>Made Sale:</label>
                        <input 
                            onChange={this.props.onToggleSale}
                            type="radio" 
                            name="made_sale?" 
                            value={this.props.formData['made_sale?']} 
                            checked={!!this.props.formData['made_sale?'] ? true : null}/>True
                        
                        <input 
                            onChange={this.props.onToggleSale}
                            type="radio" 
                            name="made_sale?" 
                            value={this.props.formData['made_sale?']} 
                            checked={!!this.props.formData['made_sale?'] ? null : true} />False
                    <br/><br/>
                </form>
            </div>
        )

    }
}

export default AppointmentUpdateForm;