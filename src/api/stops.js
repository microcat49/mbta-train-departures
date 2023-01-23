import axios from 'axios';

import { MBTA_URL } from './settings'

const getAllStops = async (line) => {
        const response = await axios.get(
                `${MBTA_URL}/stops?filter%5Broute%5D=${line}`
        )

        return response.data.data
}

export default getAllStops