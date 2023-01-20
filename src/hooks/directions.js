import { useContext} from "react"

import { LineContext } from "../data/line"
import { StopContext } from "../data/stop"

const useDirections = () => {
    const { selectedLine } = useContext(LineContext)
    const { stop } = useContext(StopContext);

    console.log(selectedLine?.directions)

    if (selectedLine && selectedLine.directions && stop) {
        return selectedLine.directions
    }

    return []
}

export default useDirections