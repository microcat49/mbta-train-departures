import { useContext, useState, useEffect} from 'react'

import { LineContext } from '../data/line'
import { DirectionContext } from '../data/direction'
import { StopContext } from '../data/stop'

import getPrediction from '../api/prediction'

const usePrediction = () => {
    const { selectedLine } = useContext(LineContext)
    const { selectedDirection } = useContext(DirectionContext)
    const { selectedStop } = useContext(StopContext)

    const [prediction, setPrediction] = useState([])
 
    useEffect(() => {
        const fetchData = async () => {
            
            let data; 
            
            if (selectedStop.id && selectedLine.id && (selectedDirection.id === 1 || selectedDirection.id === 0)) {
                data = await getPrediction(selectedStop.id, selectedLine.id, selectedDirection.id) 
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
    }, [selectedStop, selectedLine, selectedDirection])

    return prediction
}

export default usePrediction