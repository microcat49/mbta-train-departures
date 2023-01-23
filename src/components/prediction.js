import { useContext } from 'react'

import { StopContext } from '../data/stop'
import { DirectionContext } from '../data/direction'

import usePrediction from '../hooks/prediction'

import '../css/prediction.css'

export default function Prediction() {
    const { stop } = useContext(StopContext)
    const { direction: selectedDirection } = useContext(DirectionContext)

    const prediction = usePrediction()

    let arrivalTime;
    let direction;
    
    if (
        stop && 
        stop.name && 
        prediction && 
        prediction.attributes && 
        prediction.attributes.arrival_time &&
        selectedDirection &&
        selectedDirection.name
    ) {
        arrivalTime = new Date(prediction.attributes.arrival_time).toLocaleTimeString()
        direction = selectedDirection.name

    // If we are getting a valid prediction object but not an Arrival Time a train is coming but we do not know when.
    } else if (
        stop && 
        stop.name && 
        prediction && 
        prediction.attributes && 
        !prediction.attributes.arrival_time
    ) {
        arrivalTime = 'Unknown'
        direction = selectedDirection.name
    } else {
        arrivalTime = ''
    }

    return (
        <div className="prediction">
            <h1>Stop: {stop?.name}</h1>
            <h2>Estimated Arrival Time: { arrivalTime }</h2>
            <h3>Direction: {direction}</h3>
            <h3>Status: {prediction?.attributes?.status}</h3>
        </div>
    )
}