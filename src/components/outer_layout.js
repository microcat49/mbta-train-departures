import PickLists from "./pick_lists"
import Prediction from "./prediction"

import "../css/outer_layout.css"

export default function OuterLayout() {
    return (
        <div class="outer-layout"> 
            <PickLists />
            <Prediction />
        </div> 
    )
}