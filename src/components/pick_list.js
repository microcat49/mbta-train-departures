import { useContext } from 'react';

import Item from './item'

import { LineContext } from '../data/line'
import { StopContext } from '../data/stop'
import { DirectionContext } from '../data/direction';

import '../css/pick_list.css'

export default function PickList(props) {
    const {setSelectedLine} = useContext(LineContext);
    const {setStop} = useContext(StopContext);
    const {setDirection} = useContext(DirectionContext);

    let itemContents = [];
    if (props.type === 'stops') {
        itemContents = props.items.map((item, index) => 
            <Item key={index} setId={() => setStop({id: item.id, name: item.attributes.name})} name={item.attributes.name} />
        )
        
    } else if (props.type === 'line') {
        itemContents = props.items.map((item, index) =>
            <Item key={index} setId={() => setSelectedLine({id: item.id, directions: item.attributes.direction_names})} name={item.attributes.long_name} />
        )
    } else if (props.type === 'direction') {
        itemContents = props.items.map((item, index) =>
            // The MBTA uses the index in the array in the array as the ID number for the direction on a line.
            // For isntance when we want the prediction of the next train for a direction we need the index from this data to query for that direction.
            <Item key={index} setId={() => setDirection({id: index, name: item})} name={item} />
        )
    }

    return (
        <div>
            <h2 class='pick-list-header'>{props.type}</h2>
            <div class='pick-list'>
                {itemContents}
            </div>
        </div>
    )
}