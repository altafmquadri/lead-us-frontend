import React from 'react';

class ShowLeadContainer extends React.Component {
    state = {  }
    render() { 
        console.log("this is the current object", this.props.lead)
        return ( 
            <h1>{this.props.lead.id}</h1>
         );
    }
}
 
export default ShowLeadContainer;