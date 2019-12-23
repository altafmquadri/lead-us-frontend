import React, { Component, Fragment } from 'react';
import ReactMapGL, {Marker,  FlyToInterpolator} from 'react-map-gl'
import WebMercatorViewport from 'viewport-mercator-project';
import "mapbox-gl/dist/mapbox-gl.css"


const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

class Map extends Component {

    state = { 
        viewport: {
            width: 980,
            height: 350,
            latitude: 40.7577,
            longitude: -72.4376,
            zoom: 11
        },
        showDirections: false
    }
     
    showDirections = () => {
        this.setState(
            { 
                ...this.state,
                showDirections: !this.state.showDirections  
            })
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
            offset: [0, -35]
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

    

    componentDidMount() {
        this.getLeadLocation()
        // const map = this.reactMap.getMap()
        this.initializeMapForDirections()
    }
    

    initializeMapForDirections = () => {
        let userLon =  parseFloat(this.props.user.longitude)
        let userLat = parseFloat(this.props.user.latitude)
        let clientLon = parseFloat(this.props.lead.longitude)
        let clientLat = parseFloat(this.props.lead.latitude)

       const map = this.reactMap.getMap()
       
       //setting the box for the map
        // const bounds = [[clientLon, clientLat], [userLon, userLat]] 
        // map.setMaxBounds(bounds)

       const canvas = map.getCanvasContainer()
       const start = [userLon, userLat]
       const end = [clientLon, clientLat]
       
       const directionsApi = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${TOKEN}`

       const getRoute = (start, end) => {

        fetch(directionsApi).then(res => res.json()).then(res => {
            let data = res.routes[0]
            // console.log(data)
            let route = data.geometry.coordinates
            let geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: route
                }
            }
            
            if (map.getSource('route')){
                 map.getSource('route').setData(geojson)
            } else {
                map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'LineString',
                                coordinates: geojson
                            }
                        }
                    },
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    paint: {
                        'line-color': '#3887be',
                        'line-width': 5,
                        'line-opacity': 0.75
                    }
                })
            }
            //turn instructions here
            const instructions = document.getElementById('instructions')
            const steps = data.legs[0].steps
            console.log(steps)
            
            const tripInstructions = []
            for (let i = 0; i < steps.length; i++) {
                tripInstructions.push('<li>' + steps[i].maneuver.instruction + '</li>')
                instructions.innerHTML = '<br><span class="duration">Trip duration: ' + Math.floor(data.duration / 60) + ' min </span>' + tripInstructions.join('')
            }
            console.log(tripInstructions)
        })

       }
       
       
       map.on('load', function() {
           console.log('i am in the on load')
           
        //    getRoute(start, end)
           console.log(start, end)
           map.addLayer({
               id: 'point',
               type: 'circle',
               source: {
                   type: 'geojson',
                   data: {
                       type: 'FeatureCollection',
                       features: [{
                           type: 'Feature',
                           properties: {},
                           geometry: {
                               type:'Point',
                               coordinates: start
                           }
                       }]
                   }
               },
               paint: {
                   'circle-radius': 10,
                   'circle-color': '#3887be'
               }
           })
           // took out code from where var end is defined in tutorial
           if (map.getLayer('end')) {
               map.getSource('end').setData(end)
           } else {
               map.addLayer({
                   id: 'end',
                   type: 'circle',
                   source: {
                       type: 'geojson',
                       data: {
                           type: 'FeatureCollection',
                           features: [{
                               type: 'Feature',
                               properties: {},
                               geometry: {
                                   type: 'Point',
                                   coordinates: end
                               }
                           }]
                       }
                   },
                   paint: {
                       'circle-radius': 10,
                       'circle-color': '#f30'
                   }

               })
           }
       })
       getRoute(start, end)
    }
       
    

    render() { 
        console.log(this.state)
        return ( 
            <div className="map">
                <div onMouseLeave={this.showDirections} style={{display: this.state.showDirections ? 'block' : 'none'}} id="instructions"></div>
                <ReactMapGL
                    mapboxApiAccessToken={TOKEN}
                    mapStyle='mapbox://styles/mapbox/navigation-guidance-day-v4'
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({viewport})}
                    ref={(reactMap) => this.reactMap = reactMap}
                    
                    >
                        <button onClick={this.getPositions}>Get Positions</button>
                        <button onClick={this.initializeMapForDirections}>Show Route</button>
                        <button onClick={this.showDirections}>Get Directions</button>
                        <Fragment>
                            <Marker latitude={parseFloat(this.props.lead.latitude)} longitude={parseFloat(this.props.lead.longitude)}>
                                Client
                            </Marker>
                             <Marker latitude={parseFloat(this.props.user.latitude)} longitude={parseFloat(this.props.user.longitude)}>
                                You
                            </Marker>
                        </Fragment>    
                        
                </ReactMapGL>
                </div>
        
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
// https://api.mapbox.com/directions/v5/mapbox/driving/-73.853657,40.746527;-74.043505,40.721642?&steps=true&geometries=geojson&access_token=pk.eyJ1IjoiYWx0YWZtcXVhZHJpIiwiYSI6ImNrM2ppM2N3YjBqODczZHJtMHdndm84bmEifQ.cSDhDuaxlGYl34rlk2G_GA
// `https://api.mapbox.com/directions/v5/mapbox/driving/-73.853657,40.746527;-74.043505,40.721642?geometries=geojson&access_token=${TOKEN}`




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


//  componentDidMount() {
    //     //this.getLeadLocation() 
    //     const map = this.reactMap.getMap()    
    //     this.initializeMapForDirections()
    //     // fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/-73.853657,40.746527;-74.043505,40.721642?&geometries=geojson&access_token=${TOKEN}`)
    //     // fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/-73.853657,40.746527;-74.043505,40.721642?&steps=true&geometries=geojson&access_token=pk.eyJ1IjoiYWx0YWZtcXVhZHJpIiwiYSI6ImNrM2ppM2N3YjBqODczZHJtMHdndm84bmEifQ.cSDhDuaxlGYl34rlk2G_GA`)
    //     // .then(res => res.json()).then(res => {
    //     //     let data = res.routes[0]
    //     //     let route = data.geometry.coordinates
    //     //     console.log(route)
    //     // })   
    // }



    // let userLon =  parseFloat(this.props.user.longitude)
    //    let userLat = parseFloat(this.props.user.latitude)
    //    let clientLon = parseFloat(this.props.lead.longitude)
    //    let clientLat = parseFloat(this.props.lead.latitude)

    //    const map = this.reactMap.getMap()

    //    //setting the box for the map
    //    const bounds = [[userLon, userLat], [clientLon, clientLat]]
    //    map.setMaxBounds(bounds)

    //    //const canvas = map.getCanvasContainer()
    //    const start = [userLon, userLat]
    //    const end = [clientLon, clientLat]
    //    const directionsApi = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${TOKEN}`

    //    fetch(directionsApi).then(res => res.json()).then(res => {
    //        let data = res.routes[0]
    //        let route = data.geometry.coordinates
    //        let geojson = {
    //            type: 'Feature',
    //            properties: {},
    //            geometry: {
    //                type: 'LineString',
    //                coordinates: route
    //            }
    //        }
    //        if (map.getSource('route').setData(geojson)){
    //             map.getSource('route').setData(geojson)
    //        } else {
    //            map.addLayer({
    //                id: 'route',
    //                type: 'line',
    //                source: {
    //                    type: 'geojson',
    //                    data: {
    //                        type: 'Feature',
    //                        properties: {},
    //                        geometry: {
    //                            type: 'LineString',
    //                            coordinates: geojson
    //                        }
    //                    }
    //                },
    //                layout: {
    //                    'line-join': 'round',
    //                    'line-cap': 'round'
    //                },
    //                paint: {
    //                    'line-color': '#3887be',
    //                    'line-width': 5,
    //                    'line-opacity': 0.75
    //                }
    //            })
    //        }

    //    })
       
    //    map.on('load', function() {
    //        //get route which i haven't defined it's just the fetch
    //        map.addLayer({
    //            id: 'point',
    //            type: 'circle',
    //            source: {
    //                type: 'geojson',
    //                data: {
    //                    type: 'FeatureCollection',
    //                    features: [{
    //                        type: 'Feature',
    //                        properties: {},
    //                        geometry: {
    //                            type:'Point',
    //                            coordinates: start
    //                        }
    //                    }]
    //                }
    //            },
    //            paint: {
    //                'circle-radius': 10,
    //                'circle-color': '#3887be'
    //            }
    //        })
    //        //next step code
    //    })



    //next step code
        //    const destination = {
        //        type: 'FeatureCollection',
        //        features: [{
        //            type: 'Feature',
        //            properties: {},
        //            geometry: {
        //                type:'Point',
        //                coordinates: end
        //            }
        //        }]
        //    },