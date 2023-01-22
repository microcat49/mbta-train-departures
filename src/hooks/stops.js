import { useState, useEffect, useContext } from "react"

import { LineContext } from '../data/line'
import { StopContext } from '../data/stop'
import { DirectionContext } from '../data/direction'

import getAllStops from '../api/stops'

const useStops = () => {
    const [ stops, setStops ] = useState([])

    const {selectedLine} = useContext(LineContext);
    const {setStop} = useContext(StopContext);
    const {setDirection} = useContext(DirectionContext)

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllStops(selectedLine?.id)
            setStops(data)
            setStop(null)
            setDirection(null)
        }
        
        fetchData()
            .catch(error => console.log(error))
    }, [selectedLine?.id])
    return stops

}

export default useStops