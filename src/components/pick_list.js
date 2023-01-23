import Item from './item'

import '../css/pick_list.css'

export default function PickList(props) {
    let itemContents = [];
    if (props.type === 'line') {
        itemContents = props.items.map((item, index) =>
            <Item 
                key={index} 
                setId={() => {
                    props.itemSelected(item.id, item.attributes.long_name, item.attributes.direction_names);
                }} 
                name={item.attributes.long_name} />
        )
        
    } else if (props.type === 'stops') {
        itemContents = props.items.map((item, index) => 
            <Item 
                key={index} 
                setId={() => {
                    props.itemSelected(item.id, item.attributes.name); 
                }} 
                name={item.attributes.name} 
            />
        )
        
    } else if (props.type === 'direction') {
        itemContents = props.items.map((item, index) =>
            <Item 
                key={index} 
                setId={() =>
                    // The MBTA uses the index in the array in the array as the ID number for the direction on a line.
                    // For isntance when we want the prediction of the next train for a direction we need the index from this data to query for that direction.
                    props.itemSelected(index, item)
                } 
                name={item}
            />
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