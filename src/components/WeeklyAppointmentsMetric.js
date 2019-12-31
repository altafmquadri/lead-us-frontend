import React from 'react';
import { Line } from 'react-chartjs-2'

const WeeklyAppointmentsMetric =  (props) => {

        return ( 
                <div className="weekly-appointments-metric">
                    <h3>Weekly Appointments</h3>
                    <Line 
                        data={props.lineChartData}
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

export default WeeklyAppointmentsMetric;