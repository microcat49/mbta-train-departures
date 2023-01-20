import '../css/item.css'

export default function Item(props) {
    return (
        <div class='item'>
            <button onClick={() => props.setId()}>
                <p class='item-text' >{props.name}</p>
            </button>
        </div>
    )
}