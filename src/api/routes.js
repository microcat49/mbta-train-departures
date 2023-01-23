import axios from 'axios';

import { MBTA_URL } from './settings'

const getAllRoutes = async () => {
        const response = await axios.get(
                `${MBTA_URL}/routes?filter%5Btype%5D=0,1`
        )

        return response.data.data
}

export default getAllRoutes