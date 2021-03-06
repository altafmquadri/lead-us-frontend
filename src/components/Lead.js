import React from 'react';

const Lead = (props) => {
    return (
        <div className="lead">
            <li onClick={() => props.onLeadClick(props)}>{props.lead.first_name}</li>   
        </div>
    )
}

export default Lead;