import axios from 'axios';

const getAllStops = async (line) => {
        const response = await axios.get(
                `https://api-v3.mbta.com/stops?filter%5Broute%5D=${line}`
        )

        return response.data.data
}

export default getAllStops