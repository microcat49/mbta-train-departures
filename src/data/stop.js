import { createContext, useState } from "react"

export const StopContext = createContext(null)

const StopProvider = (props) => {
    const [selectedStop, setSelectedStop] = useState(null)

    return (
        <StopContext.Provider value={{selectedStop, setSelectedStop}}>
            {props.children}
        </StopContext.Provider>
    )
}

export default StopProvider