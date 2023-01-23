import { createContext, useState } from "react"

export const DirectionContext = createContext(null)

const DirectionProvider = (props) => {
    const [selectedDirection, setSelectedDirection] = useState('')

    return (
        <DirectionContext.Provider value={{selectedDirection, setSelectedDirection}}>
            {props.children}
        </DirectionContext.Provider>
    )
}

export default DirectionProvider