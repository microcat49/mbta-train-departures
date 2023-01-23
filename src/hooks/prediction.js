import { useContext, useState, useEffect} from 'react'

import { LineContext } from '../data/line'
import { DirectionContext } from '../data/direction'
import { StopContext } from '../data/stop'

import getPrediction from '../api/prediction'

const usePrediction = () => {
    const { selectedLine } = useContext(LineContext)
    const { direction } = useContext(DirectionContext)
    const { stop } = useContext(StopContext)

    const [prediction, setPrediction] = useState([])
 
    useEffect(() => {
        const fetchData = async () => {
            
            let data; 
            
            if (stop.id && selectedLine.id && (direction.id === 1 || direction.id === 0)) {
                data = await getPrediction(stop.id, selectedLine.id, direction.id) 
                if(data.length === 0) {
                    data = {}
                } else {
                    data = data[0]
                }
            } else {
                data = null
            }
            
            setPrediction(data)
        }
        
        fetchData()
            .catch(error => console.log(error))
    }, [stop, selectedLine, direction])

    return prediction
}

export default usePrediction