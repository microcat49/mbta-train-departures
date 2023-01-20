import axios from 'axios';

const getAllRoutes = async () => {
        const response = await axios.get(
                'https://api-v3.mbta.com/routes?filter%5Btype%5D=0,1'
        )

        return response.data.data
}

export default getAllRoutes