import React from 'react';
import { Polar } from 'react-chartjs-2'

const WeeklyProduction = (props) => {

        return ( 
            <div className="weekly-presentation-metric">
                <h2>Weekly Production</h2>
                <Polar data={props.polarChartData}/>
            </div>
        );
    }

export default WeeklyProduction;