import React from 'react';
import WeeklyAppointmentsMetric from './WeeklyAppointmentsMetric';
import WeeklyProduction from './WeeklyProduction';

class MetricsContainer extends React.Component {
    state = { 
        currentUser: [],
        appointments: []
     }

    componentDidMount() {
        this.setState(
            { 
                currentUser: this.props.currentUser,
                appointments: this.props.appointments 
            })
    }

    render() { 
        // console.log(this.state.currentUser)
        return ( 
            <div>

            
            <div className="metrics-page">
                <h1>Metrics</h1>
            
                <WeeklyAppointmentsMetric currentUser={this.state.currentUser}
                    appointments={this.props.appointments}/>
            </div>
                <WeeklyProduction currentUser={this.state.currentUser}
                appointments={this.state.appointments}/>
            </div>
        );
    }
}
 
export default MetricsContainer;