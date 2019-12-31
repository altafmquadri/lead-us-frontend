import React from 'react';
import { Polar } from 'react-chartjs-2'

const WeeklyProduction = (props) => {

        return ( 
            <div className="weekly-presentation-metric">
                <h3>Weekly Production</h3>
                <Polar data={props.polarChartData}/>
            </div>
        );
    }

export default WeeklyProduction;