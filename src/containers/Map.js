import React, { Component, Fragment } from 'react';
import ReactMapGL, {Marker,  FlyToInterpolator} from 'react-map-gl'
import WebMercatorViewport from 'viewport-mercator-project';

const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

class Map extends Component {

    state = { 
        viewport: {
            width: 950,
            height: 250,
            latitude: 40.7577,
            longitude: -72.4376,
            zoom: 12
        }
    }
     
    componentDidMount() {
        this.getLeadLocation()        
    }

    getLeadLocation = () => {
        this.setState(
            {   
                viewport: {...this.state.viewport, latitude: parseFloat(this.props.lead.latitude), longitude: parseFloat(this.props.lead.longitude)}
            })
    }

     getPositions = () => {
        const {longitude, latitude, zoom} = new WebMercatorViewport(this.state.viewport)
        .fitBounds([[parseFloat(this.props.lead.longitude), parseFloat(this.props.lead.latitude)], [parseFloat(this.props.user.longitude), parseFloat(this.props.user.latitude)]],{
            padding: 30,
            offset: [0, -20]
          })
        const viewport = {
            ...this.state.viewport,
            longitude,
            latitude,
            zoom,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator(),
            
        }
        this.setState({viewport})
     }

    render() { 
        
        return ( 
                <ReactMapGL
                    mapboxApiAccessToken={TOKEN}
                    mapStyle='mapbox://styles/mapbox/navigation-guidance-day-v4'
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({viewport})}
                    ref={(reactMap) => this.reactMap = reactMap}
                    
                    >
                        <button onClick={this.getPositions}>Get Positions</button>
                        <Fragment>
                            <Marker latitude={parseFloat(this.props.lead.latitude)} longitude={parseFloat(this.props.lead.longitude)}>
                                Client
                            </Marker>
                             <Marker latitude={parseFloat(this.props.user.latitude)} longitude={parseFloat(this.props.user.longitude)}>
                                You
                            </Marker>
                        </Fragment>    

                </ReactMapGL>
        
         )
    }
}
 
export default Map;






// import mapboxgl from 'mapbox-gl'
// import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN


//from cdm

// const map = this.reactMap.getMap()
        // const directions = new Directions({accessToken: mapboxgl.accessToken, profile:'mapbox/driving'})
        // map.addControl(directions, 'top-right')
        // map.addControl(
        //     new MapboxDirections({
        //     accessToken: mapboxgl.accessToken
        //     }),
        //     'top-left'
        //     )


// https://api.mapbox.com/directions/v5/mapbox/driving/-74.043505%2C40.721642%3B%20-73.853657%2C40.746527.json?access_token=pk.eyJ1IjoiYWx0YWZtcXVhZHJpIiwiYSI6ImNrM2ppM2N3YjBqODczZHJtMHdndm84bmEifQ.cSDhDuaxlGYl34rlk2G_GA




// {
//     "routes": [
//       {
//         "weight_name": "routability",
//         "legs": [
//           {
//             "summary": "I 278 East, I 495 East",
//             "steps": [],
//             "distance": 21055.3,
//             "duration": 2910,
//             "weight": 2910
//           }
//         ],
//         "geometry": "{mpwFxr|bMl@sNgs@_Gb@{UbUeuClPqYnF{FzFdG_AsDuBcBZmG|@yAkEiDlYc}@}IuDfMkk@`Lgj@v`@}lBRmBgCa\\uVgUyu@ksAmIeb@kHwSid@k`@kAgLj@uFbSmcAlImMxF}KzBo\\dAqz@uNs`@iD}f@ql@aoCkAwMaBeQ{v@n[yC{N",
//         "distance": 21055.3,
//         "duration": 2910,
//         "weight": 2910
//       }
//     ],
//     "waypoints": [
//       {
//         "distance": 11.116,
//         "name": "1st Street",
//         "location": [
//           -74.043488,
//           40.721741
//         ]
//       },
//       {
//         "distance": 20.217,
//         "name": "48th Avenue",
//         "location": [
//           -73.853752,
//           40.746696
//         ]
//       }
//     ],
//     "code": "Ok",
//     "uuid": "QAjcmRWR9dm8pAYPX42HeNodPun_IIhmxIJG5pjQU6abCnrIUXv7Aw=="
//   }