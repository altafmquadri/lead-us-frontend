import React from 'react';

const appointmentsApi = 'http://localhost:3000/api/v1/appointments'
const salesApi = 'http://localhost:3000/api/v1/sales'
const leadUpdateApi = 'http://localhost:3000/api/v1/leads'

class AppointmentUpdateForm extends React.Component {

    state = {
            appointment: this.props.clickedEditAppointment,
            'presentation_made?': false,
            'made_sale?': false,
            annualized_life_premium: 0.0,
            salePrompt: false
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
        }).then(res => res.json()).then(appointment => {
            if (appointment['made_sale?']) {
                fetch(salesApi, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        Accepts: 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: appointment.user_id,
                        lead_id: appointment.lead_id,
                        annualized_life_premium: parseFloat(this.state.annualized_life_premium)
                    })
                }).then(res => res.json()).then(sale => this.props.addSale(sale)).then(

                fetch(leadUpdateApi + '/' + appointment.lead_id, {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        Accepts: 'application/json'
                    },
                    body: JSON.stringify({
                        id: appointment.lead_id,
                        'sale_made?': true,
                        'lead_archived?': false
                    })
                }).then(res => res.json()).then(lead => this.props.addPastClient(lead)))

            }
            this.props.editTheAppointment(appointment)
        })
        this.setState(
            { 
                'presentation_made?': false,
                'made_sale?': false,
            }, () => this.props.editAppointmentFormAfterSubmit())
    } 

    amountInputHandler = (e) => {
        this.setState({ annualized_life_premium: e.target.value })
    }


    render () {
        // console.log('i am state ',this.state)
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

                    
                        {this.state['made_sale?'] === false ? null :
                            <div>
                                <label>Annualized Life Premium:</label>
                                    <input 
                                        type="number" 
                                        name="annualized_life_premium"
                                        onChange={this.amountInputHandler}
                                        value={this.state.annualized_life_premium} />
                            </div>}

                    <input type="submit" value="Submit" />
                </form>
            </div>
        )

    }
}

export default AppointmentUpdateForm;