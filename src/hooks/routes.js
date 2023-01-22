import { useEffect, useState } from "react"

import getAllRoutes from '../api/routes'

const useRoutes = () => {
    const [ routes, setRoutes ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllRoutes()
            setRoutes(data)
        }

        fetchData()
            .catch(error => console.log(error))
    }, [])
    return routes

}

export default useRoutes