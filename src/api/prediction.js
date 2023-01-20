import axios from 'axios';

const getPrediction = async (stop, route, direction) => {
        const response = await axios.get(
                `https://api-v3.mbta.com/predictions?filter%5Bstop%5D=${stop}&filter%5Broute%5D=${route}&filter%5Bdirection_id%5D=${direction}&sort=arrival_time`
        )

        return response.data.data[0]
}

export default getPrediction