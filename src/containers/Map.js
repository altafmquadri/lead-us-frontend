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
            latitude: 0,
            longitude: 0,
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
        this.initializeMapForDirections()
    }
    
    initializeMapForDirections = () => {

        let userLon =  parseFloat(this.props.user.longitude)
        let userLat = parseFloat(this.props.user.latitude)
        let clientLon = parseFloat(this.props.lead.longitude)
        let clientLat = parseFloat(this.props.lead.latitude)

        // if address is faulty 
        if (clientLon === 0 && clientLat === 0) return

        const map = this.reactMap.getMap()
        const start = [userLon, userLat]
        const end = [clientLon, clientLat]
        
        const directionsApi = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${TOKEN}`
        const getRoute = (start, end) => {
            fetch(directionsApi).then(res => res.json()).then(res => {
                if (res.routes === undefined) return //added in case fake address
                let data = res.routes[0]

                let route = data.geometry.coordinates
                let geojson = {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: route
                    }
                }
                    setTimeout(()=> null, 100) //added this to prevent error in style not loading
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
                // console.log(steps)
                
                const tripInstructions = []
                for (let i = 0; i < steps.length; i++) {
                    tripInstructions.push('<li>' + steps[i].maneuver.instruction + '</li>')
                    instructions.innerHTML = '<br><span class="duration">Trip duration: ' + Math.floor(data.duration / 60) + ' min </span>' + tripInstructions.join('')
                }
                // console.log(tripInstructions)
            }) //end fetch
        } //end function getRoute
        
        //changed from load to style.load to prevent layers being added to the map, before map style is applied
        map.on('load', function() {
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
                }, //end source object of start position lon lat
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#3887be'
                }
            }) //end start map layer
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
                    }, // end source object of end position lon lat
                    paint: {
                        'circle-radius': 10,
                        'circle-color': '#f30'
                    }
                }) //end end of map layer
            }
        })
        getRoute(start, end)
    } //end initialize map for directions

    render() {  
        return ( 
            <div className="map">
                <div onMouseLeave={this.showDirections} 
                style={{display: this.state.showDirections ? 'block' : 'none'}} 
                id="instructions"></div>
                <ReactMapGL
                    mapboxApiAccessToken={TOKEN}
                    mapStyle='mapbox://styles/mapbox/navigation-guidance-day-v4'
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({viewport})}
                    ref={(reactMap) => this.reactMap = reactMap}>

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