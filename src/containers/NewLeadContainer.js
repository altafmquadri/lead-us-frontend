import React from 'react';
import NewLeadForm from '../components/NewLeadForm'

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
        dateOfBirth: "",
        referralFrom: "",
        latitude: "",
        longitude: ""
     }

     formHandler = (e) => {
         this.setState({ [e.target.name]: e.target.value  });
     }

     formSubmissionHandler =() => {
         
     }

    render() { 
        console.log(this.props)
        return ( 
            <div className="new-lead">
                <NewLeadForm form={this.state} formHandler={this.formHandler} />
            </div>
         );
    }
}
 
export default NewLeadContainer;