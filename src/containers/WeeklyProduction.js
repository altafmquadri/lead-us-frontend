import React from 'react';
import moment from 'moment'
import { Polar } from 'react-chartjs-2'

class WeeklyProduction extends React.Component {

    // state = { 
        // currentDate: moment(),
        // currentUser: this.props.currentUser,
        // appointments: this.props.appointments,
        // weekAppointments: [],
        // presentations: [],
        // weeklySales: [],
        // polarChartData: {}
    // }

    // setPolarChartData = () => {
    //     const polarChartData = {
    //         labels: ['Appointments', 'Presentations', 'Sales'],
    //         datasets: [
    //             {
    //                 label: `$Weekly Presentation`,
    //                 data: [this.state.weekAppointments.length, this.state.presentations.length, this.state.weeklySales.length],
    //                 backgroundColor: [
    //                     'rgba(153, 102, 255, 0.2)',
    //                     'rgba(255, 99, 132, 0.2)',
    //                     'rgba(54, 162, 235, 0.2)',
    //                     'rgba(255, 206, 86, 0.2)',
    //                     'rgba(75, 192, 192, 0.2)'
    //                 ],
    //                 borderColor: [
    //                     'rgba(255, 99, 132, 1)',
    //                     'rgba(54, 162, 235, 1)',
    //                     'rgba(255, 206, 86, 1)',
    //                     'rgba(75, 192, 192, 1)',
    //                     'rgba(153, 102, 255, 1)'
    //                 ],
    //                 borderWidth: 1
    //             }]
    //     }
    //     return polarChartData
    // }

    

    // componentDidUpdate(prevState){
    //     if (prevState.currentUser !== this.props.currentUser) {
    //         this.setState(
    //             { 
    //                 currentUser: this.props.currentUser,
    //                 appointments: this.props.appointments,
                     
    //         }, () => this.setState({ presentations: this.getWeeklyPresentations() }))
    //     }
    // } 
    
    // getWeeklyPresentations = () => {
    //     let filteredAppointmentsByWeek = this.state.appointments.filter(appointment => moment(appointment.date).isSame(this.state.currentDate, 'week'))
    //     let salesonWeeklyAppointments = filteredAppointmentsByWeek.filter(appointment => appointment['made_sale?'])
    //     this.setState(
    //         { 
    //             weekAppointments: filteredAppointmentsByWeek,
    //             weeklySales: salesonWeeklyAppointments  
    //         }, () => this.setState({ polarChartData: this.setPolarChartData()  }));
    //     let presentationAppointments = filteredAppointmentsByWeek.filter(appointment => appointment['presentation_made?'])
    //     return presentationAppointments
    // }


    render() { 
        // console.log('i am props', this.props)
        // console.log('i am state',this.state)
        // console.log('filterAppp' , this.getWeeklyPresentations())
        return ( 
            <div className="weekly-presentation-metric">
                <h2>Weekly Production</h2>
                <Polar 
                        data={this.props.polarChartData}
                    />
            </div>
        );
    }
}

export default WeeklyProduction;