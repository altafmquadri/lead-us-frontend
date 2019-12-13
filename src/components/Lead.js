import React from 'react';

const Lead = (props) => {
    
    return (
        <div className="lead">
         <li>{props.lead.first_name}</li>   
         </div>
         
    )
}

export default Lead;