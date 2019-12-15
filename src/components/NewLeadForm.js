import React from 'react';

const NewLeadForm = (props) => {
    
    
    return (
        <div className="new-lead-form-div">

        <form className="new-lead-form"
        onSubmit={props.formSubmissionHandler}>
            <label>First Name:
                <input type="text" 
                name="firstName"
                value={props.form.firstName}
                onChange={props.formHandler} 
                /></label><br/><br/>

            <label>Last Name:           
                <input type="text"
                value={props.form.lastName} 
                onChange={props.formHandler} 
                name="lastName" /></label><br/><br/>

            <label>Street:              
                <input type="text"
                value={props.form.street}
                onChange={props.formHandler}
                name="street" /></label><br/><br/>

            <label>City:                
                <input type="text"
                value={props.form.city}
                onChange={props.formHandler} 
                name="city" /></label><br/><br/>

            <label>State:               
                <input type="text"
                value={props.form.state}
                onChange={props.formHandler}
                name="state" /></label> <br/><br/>

            <label>Postal Code:         
                <input type="text"
                value={props.form.postalCode}
                onChange={props.formHandler} 
                name="postalCode" /></label><br/><br/>

            <label>Phone Number:        
                <input type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                value={props.form.phoneNumbe}
                onChange={props.formHandler} 
                name="phoneNumber" /></label><br/><br/>

            <label>Beneficary Information:    
                <input type="text"
                value={props.form.beneficiaryInformation}
                onChange={props.formHandler} 
                name="beneficiaryInformation" /></label><br/><br/>

            <label>Date of Birth:    
                <input type="date"
                value={props.form.dateOfBirth}
                onChange={props.formHandler} 
                name="dateOfBirth" /></label><br/><br/>

        <input type="submit" value="Submit" />
        </form>
    </div>
       

    )
}

export default NewLeadForm;