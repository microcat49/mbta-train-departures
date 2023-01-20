import { createContext, useState } from "react"

export const LineContext = createContext(null)

const LineProvider = (props) => {
    const [selectedLine, setSelectedLine] = useState(null)

    return (
        <LineContext.Provider value={{selectedLine, setSelectedLine}}>
            {props.children}
        </LineContext.Provider>
    )
}

export default LineProvider