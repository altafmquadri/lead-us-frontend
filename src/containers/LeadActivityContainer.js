import React from 'react';
import './LeadActivityContainer.css'
import ShowLeadContainer from './ShowLeadContainer';
import CallsContainer from './CallsContainer';
import CallForm from '../components/CallForm'
import AppointmentsContainer from './AppointmentsContainer';
import AppointmentForm from '../components/AppointmentForm'
import Map from './Map'
import AppointmentUpdateForm from '../components/AppointmentUpdateForm';

const callsApi = 'http://localhost:3000/api/v1/calls'
const callsApiUpdate = 'http://localhost:3000/api/v1/calls'
const appointmentsApi = 'http://localhost:3000/api/v1/appointments'

class LeadActivityContainer extends React.Component {
    state = { 

        //for both
        user_id: '',
        lead_id: this.props.lead.id,

        //for calls
        callForm: false,
        appointmentForm: false,
        call_status: "No Answer",
        'appointment_made?': false,
        'archive_lead?': false,
        callsSubmitted: false,

        //for appointments
        title: "",
        date: "",
        start_time: "",
        end_time: "",
        'presentation_made?': false,
        'made_sale?': false,

        //to get call id in case appointment is not set
        callId: '',

        //edit appointment form
        editAppointment: false

    }

    setInitialState = () => {
        this.setState({ 
            user_id: this.props.currentUser.id, 
            lead_id: this.props.lead.id,
            callForm: false,
            appointmentForm: false,
            call_status: "No Answer",
            'appointment_made?': false,
            'archive_lead?': false,
            callsSubmitted: false,

            title: "",
            date: "",
            start_time: "",
            end_time: "",
            'presentation_made?': false,
            'made_sale?': false
        });
    }

    noAppUpdate = (e) => {
        e.preventDefault()
        fetch(callsApiUpdate + '/' + this.state.callId, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
                Accepts: 'application/json'
            },
            body: JSON.stringify({
                id: this.state.callId,
                'appointment_made?': false
            })
        }).then(res => res.json()).then(call => {
            this.props.editCallNoApp(call)
            this.setInitialState()
        })
    }

        setAppointmentState = () => {
        this.setState({ 
            user_id: this.props.currentUser.id, 
            lead_id: this.props.lead.id,
            callForm: false,
            appointmentForm: true,
            call_status: "No Answer",
            'appointment_made?': false,
            'archive_lead?': false,
            callsSubmitted: true,

            title: "",
            date: "",
            start_time: "",
            end_time: "",
            'presentation_made?': false,
            'made_sale?': false
            
        });
    }

    onPhoneClick = () => {
        this.setState(
            { callForm: !this.state.callForm,
            lead_id: this.props.lead.id
        });
    }

    onEditAppointmentClick = (appointment) => {
        this.setState({ editAppointment: !this.state.editAppointment })
        console.log(appointment)
    } 

    onFormChange = (e) => {
        this.setState({ call_status: e.target.value  });
    }

    onToggleArchive = () => {
        this.setState({ 'archive_lead?': !this.state['archive_lead?']  });
    }

    onToggleAppointment = () => {
        this.setState({ 'appointment_made?': !this.state['appointment_made?']  });
    }

    onTogglePresentation = () => {
        this.setState({ 'presentation_made?': !this.state['presentation_made?']  });
    }

    onToggleSale = () => {
        this.setState({ 'made_sale?': !this.state['made_sale?']  });
    }

    onFormSubmission = (e) => {
        e.preventDefault()

        if (this.state['appointment_made?'] === false) {
            fetch(callsApi, {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json',
                    Accepts: 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    lead_id: this.state.lead_id,
                    call_status: this.state.call_status,
                    'appointment_made?': this.state['appointment_made?'],
                    'archive_lead?': this.state['archive_lead?']
                })
            }).then(resp => resp.json()).then(call => this.props.addNewCall(call))
            this.setInitialState()
            this.setState({ callsSubmitted: true  });

        } else if (this.state['appointment_made?']) {
            fetch(callsApi, {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json',
                    Accepts: 'application/json'
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    lead_id: this.state.lead_id,
                    call_status: this.state.call_status,
                    'appointment_made?': this.state['appointment_made?'],
                    'archive_lead?': this.state['archive_lead?']
                })
            }).then(resp => resp.json()).then(call => {
                this.props.addNewCall(call)
                this.setAppointmentState()
                this.setState({ callId: call.id });
            })    
        }
    }

    onAppointmentSubmit = (e) => {
        e.preventDefault()
        let newStartTime = this.state.date + 'T' + this.state.start_time
        let newEndTime = this.state.date + 'T' + this.state.end_time

        console.log(newStartTime)

        fetch(appointmentsApi, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Accepts: 'application/json'
            },
            body: JSON.stringify({
                user_id: this.state.user_id,
                lead_id: this.state.lead_id,
                title: this.state.title,
                date: this.state.date,
                start_time: newStartTime,
                end_time: newEndTime,
                'presentation_made?': this.state['presentation_made?'],
                'made_sale?': this.state['made_sale?']
            })
        }).then(res => res.json()).then(appointment => this.props.addNewAppointment(appointment))
        this.setInitialState()
    }

    partialFormHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value  });
    }

    componentDidMount() {

        let newState = (this.props.currentUser === null ? localStorage.user_id :this.props.currentUser.id )
        // console.log("i am newstate:",newState)
        this.setState({ user_id: newState   });
    }

    

    render() { 
        // console.log('I am from props in leadActCont',this.props)
        // console.log('I am from state in leadActCont',this.state)
        // console.log("i am localstorage:" ,localStorage.user_id)
        return ( 
            <div className="activity-show-page">
                <div className="lead-show-page">
                    <ShowLeadContainer lead={this.props.lead} onPhoneClick={this.onPhoneClick}/>
                    <CallsContainer calls={this.props.calls} />
                    <AppointmentsContainer 
                    clickedLeadAppointments={this.props.clickedLeadAppointments}
                    onEditAppointmentClick={this.onEditAppointmentClick}/>
                </div>

                {/* call form is true and appointment form is false just show call form, if appointment 
                form is true upon submission, do not show the call form */}
                {this.state.callForm  && !this.state.appointmentForm ? <CallForm calls={this.props.calls} 
                formData={this.state}
                onToggleArchive={this.onToggleArchive}
                onFormSubmission={this.onFormSubmission}
                onToggleAppointment={this.onToggleAppointment}
                onFormChange={this.onFormChange}/> : null }

                {/* appointment form is true just show appoinment form} */}
                {this.state.appointmentForm ? <AppointmentForm formData={this.state}
                partialFormHandler={this.partialFormHandler}
                
                noAppUpdate={this.noAppUpdate}
                onAppointmentSubmit={this.onAppointmentSubmit}
                /> : null}

                {/* edit appointment form */}
                {this.state.editAppointment ? <AppointmentUpdateForm
                formData={this.state}
                onTogglePresentation={this.onTogglePresentation}
                onToggleSale={this.onToggleSale}
                editTheAppointment={this.props.editTheAppointment}
                /> :null}

                <div className="map-div">
                    <Map lead={this.props.lead} user={this.props.currentUser}/>
                </div>

            </div>
                
            );
        }
    }
    
    export default LeadActivityContainer;