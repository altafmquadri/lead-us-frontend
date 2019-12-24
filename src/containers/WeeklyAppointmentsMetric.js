import React, { Component } from 'react';
import moment from 'moment'
import { Line } from 'react-chartjs-2'

class WeeklyAppointmentsMetric extends Component {
    state = { 
        currentUser: this.props.currentUser,
        currentDate: moment(),
        appointmentDates: [],
        filteredAppointmentDatesByWeek: [],
        daysOfWeek: [],
        countOfApptInDaysOfWeek: [],
        data: {}
    }

    componentDidMount() {
        let newDates, filteredAppointmentDatesByWeek
        //take all appointments
        newDates = this.props.appointments.map(appointment => appointment.date)
        //take appointments and filter them by current week
        //compare today's date with the array of appointments
        filteredAppointmentDatesByWeek = newDates.filter(date => moment(date).isSame(this.state.currentDate, 'week'))
        this.setState(
            { 
                appointmentDates: [...this.state.appointmentDates, ...newDates],
                filteredAppointmentDatesByWeek: [...this.state.filteredAppointmentDatesByWeek, ...filteredAppointmentDatesByWeek],
                daysOfWeek: [...this.state.daysOfWeek, ...this.getDaysOfTheWeek()],
            }, () => this.setState(
                {
                    countOfApptInDaysOfWeek: [...this.state.countOfApptInDaysOfWeek, ...this.countOfApptInDaysOfWeek(this.state.daysOfWeek, this.state.filteredAppointmentDatesByWeek)]  
                }, () => this.setState({ data: {...this.setChartData()}  })))
    }

    getDaysOfTheWeek = () => {
        let beginningOfWeek = moment().startOf('week')
        let daysOfWeek = []
        //used knowledge of today's date and the start of the week to iterate days to the end of the week
        daysOfWeek.push(beginningOfWeek.format('YYYY-MM-DD'))
        for (let i = 1; i < 7; i++) {
            daysOfWeek.push(beginningOfWeek.add(1, 'days').format('YYYY-MM-DD'))
        }
        return daysOfWeek
    }

    // console.log(moment().isSame(moment('2019-12-23'),'date'))
    countOfApptInDaysOfWeek = (a, b) => {
        let counts = []
        for (let i = 0; i < a.length; i++) {
            let count = 0;
            for (let j = 0; j < b.length; j++) {
                if (moment(b[j]).isSame(moment(a[i]))) {
                    count++
                }
            }
            counts.push(count)
        }
        return counts
    }

    setChartData = () => {
        const chartData = {
            labels: this.state.daysOfWeek,
            datasets: [
                {
                    label: `${this.state.filteredAppointmentDatesByWeek.length} Appointments for the week`,
                    data: this.state.countOfApptInDaysOfWeek,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 1
                }]
        }
        return chartData
    }


    render() {
        
        // console.log('i am the state ',this.state)
        // console.log('i am the daysOfWeek ',this.state.daysOfWeek[0])
        // console.log(this.state.currentDate.toDate())
        
        // let beginningOfWeek = moment().startOf('week').add(6, 'days').toDate()
        // let endOfWeek = moment().endOf('week').date()
        // console.log('i am the days of the week ',this.getDaysOfTheWeek())
        // console.log(this.countOfApptInDaysOfWeek(this.state.daysOfWeek, this.state.filteredAppointmentDatesByWeek))

       
       
        return ( 
                <div className="weekly-appointments-metric">
                    <h2>Weekly Appointments</h2>
                    <Line 
                        data={this.state.data}
                        options={{
                            scales: {
                                yAxes: [{
                                    display: true,
                                    ticks: {
                                        beginAtZero: true,
                                        stepSize: 1
                                    }
                                }]
                            }
                        }}
                    />
                </div>
        );
    }
}

export default WeeklyAppointmentsMetric;