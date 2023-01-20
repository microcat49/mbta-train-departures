import { createContext, useState } from "react"

export const StopContext = createContext(null)

const StopProvider = (props) => {
    const [stop, setStop] = useState(null)

    return (
        <StopContext.Provider value={{stop, setStop}}>
            {props.children}
        </StopContext.Provider>
    )
}

export default StopProvider