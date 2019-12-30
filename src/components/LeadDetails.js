import React from 'react';


const LeadDetails = (props) => {
    // console.log(props)
    const { first_name, last_name, date_of_birth, street, city, state, postal_code, beneficiary_information, phone_number } = props.lead
    return (
        <div className="lead-details" >
            <h2>{`${first_name} ${last_name}`}<hr></hr></h2>
            <p>{`Address: ${street}, ${city}, ${state} ${postal_code}`}</p>
            <p>{`DOB: ${date_of_birth}`}</p>
            <p>{`Beneficiary: ${beneficiary_information}`}</p>
            <p className="special" onClick={props.onPhoneClick}>{`Phone Number: ${phone_number}`}</p>
        </div>
    )
} 

export default LeadDetails;