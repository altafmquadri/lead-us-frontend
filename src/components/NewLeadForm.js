import React from 'react';
import './Forms.css'

const NewLeadForm = (props) => {
    
    
    return (
        <div className="new-lead-form-div">

        <form 
            className="new-lead-form"
            onSubmit={props.formSubmissionHandler}>

            <div className="label-input"> 
                <label>First Name:</label>
                    <input className="form-input" 
                    type="text" 
                    name="firstName"
                    value={props.form.firstName}
                    onChange={props.formHandler}/>
            </div>

            <div className="label-input">
                <label>Last Name:</label>
                    <input className="form-input" 
                    type="text"
                    value={props.form.lastName} 
                    onChange={props.formHandler} 
                    name="lastName" />
            </div>

            <div className="label-input">
                <label>Street:</label>
                    <input className="form-input" 
                    type="text"
                    value={props.form.street}
                    onChange={props.formHandler}
                    name="street" />
            </div>

            <div className="label-input">
                <label>City:</label>
                    <input className="form-input" 
                    type="text"
                    value={props.form.city}
                    onChange={props.formHandler} 
                    name="city" />
            </div>

            <div className="label-input">
                <label>State:</label>
                    <input className="form-input" 
                    type="text"
                    value={props.form.state}
                    onChange={props.formHandler}
                    name="state" /> 
            </div>

            <div className="label-input">
                <label>Postal Code:</label>
                    <input className="form-input" 
                    type="text"
                    value={props.form.postalCode}
                    onChange={props.formHandler} 
                    name="postalCode" />
            </div>

            <div className="label-input">
                <label>Phone Number:</label>
                    <input className="form-input" 
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={props.form.phoneNumbe}
                    onChange={props.formHandler} 
                    name="phoneNumber" />
            </div>

            <div className="label-input">
                <label>Beneficary Information:</label>
                    <input className="form-input" 
                    type="text"
                    value={props.form.beneficiaryInformation}
                    onChange={props.formHandler} 
                    name="beneficiaryInformation" />
            </div>
        
            <div className="label-input">
                <label>Date of Birth:</label>
                    <input className="form-input" 
                    type="date"
                    value={props.form.dateOfBirth}
                    onChange={props.formHandler} 
                    name="dateOfBirth" />
            </div>

            <div className="submit">
                <input className="submit-btn" type="submit" value="Submit" />
            </div>
        </form>
    </div>
    )
}

export default NewLeadForm;