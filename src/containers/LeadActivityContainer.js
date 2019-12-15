import React from 'react';
import './LeadActivityContainer.css'
import ShowLeadContainer from './ShowLeadContainer';
import CallsContainer from './CallsContainer';

class LeadActivityContainer extends React.Component {
    state = {  }


    render() { 
        console.log(this.props.calls)
        return ( 
            <div className="lead-show-page">
                <ShowLeadContainer lead={this.props.lead}/>
                <CallsContainer calls={this.props.calls}/>

            </div>
            );
        }
    }
    
    export default LeadActivityContainer;
    //console.log("this is the current object", this.props.lead)