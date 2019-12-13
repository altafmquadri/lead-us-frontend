import React from 'react';

class NewLeadContainer extends React.Component {

    state = { 

        firstName: "",
        lastName: "",
        street: "",
        city: "",
        state: "",
        postal_code: "",
        phoneNumber: "",
        beneficiaryInformation: "",
        dateOfBirth: "",
        referralFrom: "",
        latitude: "",
        longitude: ""
     }


    render() { 
        
        return ( 
            <div className="referral">
                <h1>New Lead</h1>
            </div>
         );
    }
}
 
export default NewLeadContainer;