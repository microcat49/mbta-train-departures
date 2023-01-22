import { useContext} from "react"

import { LineContext } from "../data/line"
import { StopContext } from "../data/stop"

const useDirections = () => {
    const { selectedLine } = useContext(LineContext)
    const { stop } = useContext(StopContext);

    if (selectedLine && selectedLine.directions && stop) {
        return selectedLine.directions
    }

    return []
}

export default useDirections