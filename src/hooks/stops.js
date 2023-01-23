import { useState, useEffect, useContext } from "react"

import { LineContext } from '../data/line'
import { StopContext } from '../data/stop'
import { DirectionContext } from '../data/direction'

import getAllStops from '../api/stops'

const useStops = (getStops) => {
    const [ stops, setStops ] = useState([])

    const {selectedLine} = useContext(LineContext);
    const {setDirection} = useContext(DirectionContext);

    useEffect(() => {
        if (getStops) {
            setDirection(null)
            const fetchData = async () => {
                const data = await getAllStops(selectedLine?.id)
                setStops(data)
                
            }

            fetchData()
                .catch(error => console.log(error))
        }
    }, [selectedLine?.id, getStops])
    return stops

}

export default useStops