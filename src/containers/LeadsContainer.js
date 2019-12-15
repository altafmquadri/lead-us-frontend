import React from 'react';
import Lead from '../components/Lead'

class LeadsContainer extends React.Component {
    
    renderLeads = () => {
        return this.props.leads.map(lead => 
        <Lead key={lead.id} 
            lead={lead} 
            // addNewLead={this.props.addNewLead} this should be hear will comment out and delete later
            onLeadClick={this.props.onLeadClick}
            // history={this.props.history}
            // match={this.props.match}
            // location={this.props.location}
            />)  
        }

    render() { 
        // console.log(this.props)
        return ( 
            <div className="leads-container">
                <h1>My Leads</h1>
                <ul>
                    {this.renderLeads()}
                </ul>
            </div>
         );
     }
}
 
export default LeadsContainer;