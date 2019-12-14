import React from 'react';
import NewLeadForm from '../components/NewLeadForm'

const api = 'http://localhost:3000/api/v1/users'

class NewLeadContainer extends React.Component {

    state = { 
        currentUser: 1, //hard coded for now, when implementing auth will have current user with id
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        phoneNumber: "",
        beneficiaryInformation: "",
        dateOfBirth: ""
     }

     formHandler = (e) => {
         this.setState({ [e.target.name]: e.target.value  });
     }

     formSubmissionHandler =(e) => {
         e.preventDefault()
         fetch(api, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
                 accepts: 'application/json' 
             },
             body: JSON.stringify({

                 user_id: this.state.currentUser,
                 first_name: this.state.firstName,
                 last_name: this.state.lastName,
                 street: this.state.street,
                 city: this.state.city,
                 state: this.state.state,
                 postal_code: this.state.postalCode,
                 phone_number: this.state.phoneNumber,
                 beneficiary_information: this.state.beneficiaryInformation,
                 date_of_birth: this.state.dateOfBirth
             })
         }).then(resp => resp.json()).then(data => console.log)
     }

    render() { 
        console.log(this.props)
        return ( 
            <div className="new-lead">
                <NewLeadForm 
                form={this.state} 
                formHandler={this.formHandler} 
                formSubmissionHandler={this.formSubmissionHandler} />
            </div>
         );
    }
}
 
export default NewLeadContainer;