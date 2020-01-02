import React from 'react';

const Call = (props) => {
    return (
        <div className="call">
            <li>{props.call.call_status}</li>
        </div>
    )
}

export default Call;