import React from 'react';
import WeeklyAppointmentsMetric from './WeeklyAppointmentsMetric';

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
        return ( 
            <div className="metrics-page">
                <h1>Metrics</h1>
                <WeeklyAppointmentsMetric currentUser={this.state.currentUser}
                    appointments={this.props.appointments}/>

            </div>
        );
    }
}
 
export default MetricsContainer;