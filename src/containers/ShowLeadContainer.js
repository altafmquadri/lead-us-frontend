import React from 'react';

class ShowLeadContainer extends React.Component {
    state = {  }
    render() { 
        console.log(this.props.lead, "this is the current object")
        return ( 
            <h1>{this.props.lead.id}</h1>
         );
    }
}
 
export default ShowLeadContainer;