import React from 'react';
import Lead from '../components/Lead'


class LeadsContainer extends React.Component {
    
    renderLeads = () => {
        if (this.props.leads === undefined) return
            return this.props.leads.map(lead => 
                <Lead key={lead.id} 
                lead={lead} 
                onLeadClick={this.props.onLeadClick}
            />)  
    }

    render() { 
        // console.log(this.props)
        return ( 
            <div className="leads-container">
                <h1>My Leads</h1>
                <hr></hr>
                <ul className="leads-ls">
                    {this.renderLeads()}
                </ul>
            </div>
        );
    }
}
export default LeadsContainer;