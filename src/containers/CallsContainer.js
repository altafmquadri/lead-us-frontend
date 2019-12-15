import React from 'react';
import Call from '../components/Call'

const CallsContainer = (props) => {

    const renderCalls = () => {
        return props.calls.map(call => <Call key={call.id} call={call}/>)
    }

    return (
        <div className="calls-container">
            <h1>Calls</h1>
            <ol>
                {renderCalls()}
            </ol>
        </div>
    )
}

export default CallsContainer;