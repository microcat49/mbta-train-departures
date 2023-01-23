import { createContext, useState } from "react"

export const DirectionContext = createContext(null)

const DirectionProvider = (props) => {
    const [direction, setDirection] = useState('')

    return (
        <DirectionContext.Provider value={{direction, setDirection}}>
            {props.children}
        </DirectionContext.Provider>
    )
}

export default DirectionProvider