import React from 'react';

const appointmentsApi = 'http://localhost:3000/api/v1/appointments'

class AppointmentUpdateForm extends React.Component {

    state = {
            appointment: this.props.clickedEditAppointment,
            'presentation_made?': false,
            'made_sale?': false
    }

    onTogglePresentation = () => {
        this.setState({ 'presentation_made?': !this.state['presentation_made?']  });
    }

    onToggleSale = () => {
        this.setState({ 'made_sale?': !this.state['made_sale?']  });
    }

    onAptEditSubmission = (e) => {
        e.preventDefault()
        fetch(appointmentsApi + '/' + this.state.appointment.id, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Accepts: 'application/json'
            },
            body: JSON.stringify({
                id: this.state.appointment.id,
                'presentation_made?': this.state['presentation_made?'],
                'made_sale?': this.state['made_sale?']
            })
        }).then(res => res.json()).then(appointment => this.props.editTheAppointment(appointment))
        this.setState(
            { 
                'presentation_made?': false,
                'made_sale?': false  
            }, () => this.props.editAppointmentFormAfterSubmit())
    } 


    render () {
        // console.log('i am state ',this.state.appointment.id)
        // console.log('i am props ',this.props)
        // console.log(this.props.clickedEditAppointment)
        
        return (
            <div className="appointment-update">
                <form onSubmit={this.onAptEditSubmission} 
                    className="appointment-update-form">
                    <label>Presentation Made:</label>
                        <input 
                            type="radio" 
                            name="presentation_made?" 
                            onChange={this.onTogglePresentation}
                            value={this.state['presentation_made?']} 
                            checked={!!this.state['presentation_made?'] ? true : null}/>True
                        
                        <input 
                            type="radio" 
                            name="presentation_made?" 
                            onChange={this.onTogglePresentation}
                            value={this.state['presentation_made?']} 
                            checked={!!this.state['presentation_made?'] ? null : true}/>False
                    <br/><br/>
    
                    <label>Made Sale:</label>
                        <input 
                            type="radio" 
                            name="made_sale?" 
                            onChange={this.onToggleSale}
                            value={this.state['made_sale?']} 
                            checked={!!this.state['made_sale?'] ? true : null}/>True
                        
                        <input 
                            type="radio" 
                            name="made_sale?" 
                            onChange={this.onToggleSale}
                            value={this.state['made_sale?']} 
                            checked={!!this.state['made_sale?'] ? null : true} />False
                    <br/><br/>

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )

    }
}

export default AppointmentUpdateForm;