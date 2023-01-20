import { useContext } from 'react'

import { StopContext } from '../data/stop'
import { DirectionContext } from '../data/direction'

import usePrediction from '../hooks/prediction'

import '../css/prediction.css'

export default function Prediction() {
    const { stop } = useContext(StopContext)
    const { direction } = useContext(DirectionContext)

    const prediction = usePrediction()

    let arrivalTime;
    if (stop && stop.name && prediction && prediction.attributes && prediction.attributes.arrival_time) {
        arrivalTime = new Date(prediction.attributes.arrival_time).toLocaleTimeString()
    } else if (stop && stop.name && prediction && prediction.attributes && !prediction.attributes.arrival_time) {
        arrivalTime = 'Unkown'
    } else {
        arrivalTime = ''
    }

    return (
        <div class="prediction">
            <h1>Stop: {stop?.name}</h1>
            <h2>Estimated Arrival Time: { arrivalTime }</h2>
            <h3>Direction: {direction && direction.name}</h3>
            <h3>Status: {prediction?.attributes?.status}</h3>
        </div>
    )
}