import React from 'react';
import moment from 'moment'
import WeeklyAppointmentsMetric from '../components/WeeklyAppointmentsMetric';
import WeeklyProduction from '../components/WeeklyProduction';
import './MetricsContainer.css'

class MetricsContainer extends React.Component {
    state = { 
        currentUser: [],
        sales: [],
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
        polarChartData: {},
        weeklyFilteredSales: [],
        salesAmount: 0
    }

    componentDidMount() {
        this.setState(
            { 
                currentUser: this.props.currentUser,
                appointments: this.props.appointments,
                sales: this.props.sales
                
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
                    }, () => this.setState({ lineChartData: {...this.setLineChartData()}  }, () => this.getSalesForTheCurrentWeek(this.state.sales, this.state.weeklySales))))
                
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
            // initialize all the current week's days to a count of zero
            let count = 0;
            for (let j = 0; j < b.length; j++) {
                //if there is a date that matches the current weekday, then increment that date's count by 1
                if (moment(b[j]).isSame(moment(a[i]))) {
                    count++
                }
            }
            counts.push(count)
        }
        return counts
    }

    //  => {
    //     console.log('hi')
    // }


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

    getSalesForTheCurrentWeek = (a, b) => {
        // if (a === undefined || b === undefined) return
            let sales = a // total of all sales user has
            let weekSales = b // all this current week sales
            let weekSalesids = weekSales.map(wSale => wSale.lead_id) //week sales are all the appointments
            let weeklyFilteredSales = sales.filter(sale => weekSalesids.includes(sale.lead_id)) // want all of the total sales that correspond to the week
            this.setState({ weeklyFilteredSales: [...weeklyFilteredSales]  });
            //sum up all the annualized life premiums for the week
            let salesAmount = weeklyFilteredSales.reduce((total, alp)=> {
                return total + alp.annualized_life_premium
            }, 0)
            this.setState({ salesAmount: salesAmount  });
    }

    render() { 
        console.log(this.state)
        // console.log(this.getSalesForTheCurrentWeek(this.state.currentUser.sales, this.state.weeklySales))
        return ( 
            <div className="metrics-page-container">
                
            <div className="metrics-page">
                <h1>Metrics</h1>
                <WeeklyAppointmentsMetric lineChartData={this.state.lineChartData}/>
                <WeeklyProduction polarChartData={this.state.polarChartData}/>
            </div>
                <div>
                    <h1>Production</h1>
                    <h5>Annualized Life Premium: ${this.state.salesAmount.toFixed(2)}</h5>
                    <p>Written for the week of {moment().startOf('week').format('MM-DD')} 
                    {" "} through {moment().endOf('week').format('MM-DD')}</p>


                    <h1>Ratios</h1>
                    <p>Show Ratio:{" ",parseFloat(this.state.presentations.length/this.state.weekAppointments.length).toFixed(2)}</p>
                    <p>Close Ratio:{" ",parseFloat(this.state.presentations.length/this.state.weeklyFilteredSales.length).toFixed(2)}</p>
                </div>
            </div>
        );
    }
}

export default MetricsContainer;