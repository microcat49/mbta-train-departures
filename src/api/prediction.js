import axios from 'axios';

import { MBTA_URL } from './settings'

const getPrediction = async (stop, route, direction) => {
        const response = await axios.get(
                `${MBTA_URL}/predictions?filter%5Bstop%5D=${stop}&filter%5Broute%5D=${route}&filter%5Bdirection_id%5D=${direction}&sort=departure_time`
        )

        return response.data.data[0]
}

export default getPrediction