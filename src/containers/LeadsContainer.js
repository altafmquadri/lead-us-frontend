import React from 'react';
import Lead from '../components/Lead'
import './LeadsContainer.css'

class LeadsContainer extends React.Component {
    
    renderLeads = () => {
        if (this.props.leads === undefined) return
            return this.props.leads.map(lead => 
                <Lead key={lead.id} 
                lead={lead} 
                onLeadClick={this.props.onLeadClick}
            // addNewLead={this.props.addNewLead} this shouldn't be here will comment out and delete later
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
                <ul className="leads-ls">
                    {this.renderLeads()}
                </ul>
            </div>
        );
    }
}
export default LeadsContainer;