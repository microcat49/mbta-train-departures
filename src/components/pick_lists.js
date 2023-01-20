import PickList from './pick_list'

import useStops from '../hooks/stops'
import useRoutes from '../hooks/routes'
import useDirections from '../hooks/directions'

import '../css/pick_lists.css'

export default function PickLists() {
    const stops = useStops()
    const routes = useRoutes()
    const direction = useDirections()

    return (
        <div class="pick-lists">
            <PickList key='line' type='line' items={routes}></PickList>
            <PickList key='stops' type='stops' items={stops}></PickList>
            <PickList key='direction' type='direction' items={direction}></PickList>
        </div>
    )
}
