import { useContext } from 'react'

import { StopContext } from '../data/stop'
import { DirectionContext } from '../data/direction'

import usePrediction from '../hooks/prediction'

import '../css/prediction.css'

export default function Prediction() {
    const { stop } = useContext(StopContext)
    const { direction: selectedDirection } = useContext(DirectionContext)

    const prediction = usePrediction()

    let departureTime;
    let direction;
    
    if (
        stop && 
        stop.name && 
        prediction && 
        selectedDirection &&
        selectedDirection.name &&
        prediction.attributes && 
        prediction.attributes.departure_time
        
    ) {
        departureTime = new Date(prediction.attributes.departure_time).toLocaleTimeString()
        direction = selectedDirection.name

    // If we are getting a valid prediction object but no valid departure time it's because train do not depart from this stop.
    } else if (
        stop && 
        stop.name && 
        prediction && 
        selectedDirection &&
        selectedDirection.name &&
        prediction &&
        prediction.attributes && 
        !prediction.attributes.departure_time
    ) {
        departureTime = 'Trains do not depart from this stop'
        direction = selectedDirection.name

    // If we are getting a valid prediction object but no predictions a train is coming but it's so far in the future we do not know when.
    } else if (
        stop && 
        stop.name && 
        prediction && 
        selectedDirection &&
        selectedDirection.name &&
        prediction &&
        !prediction.attributes
    ) {
        departureTime = 'Unknown'
        direction = selectedDirection.name
    } else {
        departureTime = ''
    }

    return (
        <div className="prediction">
            <h1>Stop: {stop?.name}</h1>
            <h2>Estimated Departure Time: { departureTime }</h2>
            <h3>Direction: {direction}</h3>
            <h3>Status: {prediction?.attributes?.status}</h3>
        </div>
    )
}