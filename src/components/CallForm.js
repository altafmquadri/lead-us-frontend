import React from 'react';

const CallForm = (props) => {
    return (
        <div className="call-form">
            <br/><br/>
            <label>Call Status: </label>
            <select name="call_status">
                <option value="No Answer">No Answer</option>
                <option value="Left Message">Left Message</option>
                <option value="Call Again">Call Again</option>
            </select>
            <br/><br/>
        </div>
    )
}

export default CallForm;