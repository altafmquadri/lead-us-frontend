import React from 'react';
import moment from 'moment'
import WeeklyAppointmentsMetric from '../components/WeeklyAppointmentsMetric';
import WeeklyProduction from '../components/WeeklyProduction';
import './MetricsContainer.css'

class MetricsContainer extends React.Component {
    state = { 
        currentUser: [],
        currentDate: moment(),
        appointments: [],
        appointmentDates: [],
        filteredAppointmentDatesByWeek: [],
        daysOfWeek: [],
        countOfApptInDaysOfWeek: [],
        lineChartData: {},
        weekAppointments: [],
        presentations: [],
        weeklySales: [],
        polarChartData: {}
    }

    componentDidMount() {
        this.setState(
            { 
                currentUser: this.props.currentUser,
                appointments: this.props.appointments,
                
            }, () => this.setState({ presentations: this.getWeeklyPresentations() }))


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
                    }, () => this.setState({ lineChartData: {...this.setLineChartData()}  })))
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

    getWeeklyPresentations = () => {
        let filteredAppointmentsByWeek = this.state.appointments.filter(appointment => moment(appointment.date).isSame(this.state.currentDate, 'week'))
        let salesonWeeklyAppointments = filteredAppointmentsByWeek.filter(appointment => appointment['made_sale?'])
        this.setState(
            { 
                weekAppointments: filteredAppointmentsByWeek,
                weeklySales: salesonWeeklyAppointments  
            }, () => this.setState({ polarChartData: this.setPolarChartData()  }));
        let presentationAppointments = filteredAppointmentsByWeek.filter(appointment => appointment['presentation_made?'])
        return presentationAppointments
    }

    setLineChartData = () => {
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

    setPolarChartData = () => {
        const polarChartData = {
            labels: ['Appointments', 'Presentations', 'Sales'],
            datasets: [
                {
                    label: `$Weekly Presentation`,
                    data: [this.state.weekAppointments.length, this.state.presentations.length, this.state.weeklySales.length],
                    backgroundColor: [
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
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
        return polarChartData
    }

    render() { 
        console.log(this.state)
        return ( 
            <div>
                <h1>Metrics</h1>
            <div className="metrics-page">
                <WeeklyAppointmentsMetric lineChartData={this.state.lineChartData}/>
                <WeeklyProduction polarChartData={this.state.polarChartData}/>
            </div>
            </div>
        );
    }
}
 
export default MetricsContainer;