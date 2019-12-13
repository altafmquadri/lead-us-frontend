import React from 'react';
import Lead from '../components/Lead'

class LeadsContainer extends React.Component {
    
    renderLeads = () => {
        return this.props.leads.map(lead => <Lead key={lead.id} lead={lead}/>)
    }

    render() { 
        
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