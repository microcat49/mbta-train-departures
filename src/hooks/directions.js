import { useContext} from "react"

import { LineContext } from "../data/line"
import { StopContext } from "../data/stop"

const useDirections = (shouldRetrieveDirections) => {
    const { selectedLine } = useContext(LineContext)

    if (shouldRetrieveDirections) {
        return selectedLine.directions
    }

    return []
}

export default useDirections