import React from 'react';
import './LeadActivityContainer.css'
import ShowLeadContainer from './ShowLeadContainer';

class LeadActivityContainer extends React.Component {
    state = {  }


    render() { 
        console.log(this.props.calls)
        return ( 
            <div className="lead-show-page">
                <ShowLeadContainer lead={this.props.lead}/>
                <h1>Calls</h1>

            </div>
            );
        }
    }
    
    export default LeadActivityContainer;
    //console.log("this is the current object", this.props.lead)