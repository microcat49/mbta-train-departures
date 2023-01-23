import { useEffect, useReducer, useContext } from 'react'

import PickList from './pick_list'

import getAllRoutes from '../api/routes'
import getAllStops from '../api/stops'

import { LineContext } from '../data/line'
import { StopContext } from '../data/stop'
import { DirectionContext } from '../data/direction';

import '../css/pick_lists.css'

const ACTIONS = {
    SELECT_LINE: "select_line",
    SELECT_STOP: "select_stop",
    SELECT_DIRECTION: "select_direction",
    ROUTES_SUCCESS: "routes_success",
    STOPS_SUCCESS: "stops_sucess"
}

const piskListsReducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.SELECT_LINE:
            return {
                ...state,
                selectedLineName: action.data.selectedLineName,
                selectedLineID:   action.data.selectedLineID,
                directions:       action.data.directions,
                selectedStopName: '',
                selectedStopID:   '',
                selectedDirectionName: '',
                selectedDirectionID: '',
                showDirections: false
            }
        case ACTIONS.SELECT_STOP:
            return {
                ...state,
                selectedStopName: action.data.selectedStopName,
                selectedStopID:   action.data.selectedStopID,
                selectedDirectionName: '',
                selectedDirectionID: '',
                showDirections: true
            }
        case ACTIONS.SELECT_DIRECTION:
            return {
                ...state, 
                selectedDirectionName: action.data.selectedDirectionName,
                selectedDirectionID:   action.data.selectedDirectionID
            }
        case ACTIONS.ROUTES_SUCCESS:
            return {
                ...state, 
                routes: action.data
            }
        case ACTIONS.STOPS_SUCCESS:
            return {
                ...state, 
                stops: action.data
            }
    }

}

const initialState = {
    directions: [],
    selectedStopID: '',
    selectedStopName: '',
    selectedLineID: '',
    selectedLineName: '',
    selectedDirectionName: '', 
    selectedDirectionID: '',
    showDirections: false,
    stops: [],
    directions: [],
    routes: []

}

export default function PickLists() {
    const {setSelectedLine} = useContext(LineContext);
    const {setStop} = useContext(StopContext);
    const {setDirection} = useContext(DirectionContext);

    const [state, dispatch] = useReducer(piskListsReducer, initialState);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllRoutes()
            dispatch({type: ACTIONS.ROUTES_SUCCESS, data: data})
        }

        fetchData()
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        if (state.selectedLineID) {
            console.log(state.selectedLineID)
            const fetchData = async () => {
                const data = await getAllStops(state.selectedLineID)
                dispatch({type: ACTIONS.STOPS_SUCCESS, data: data})
            }
        
            fetchData()
                .catch(error => console.log(error))
        }
    }, [state.selectedLineID])

    useEffect(() => {
        setSelectedLine({name: state.selectedLineName, id: state.selectedLineID})
        setStop({name: state.selectedStopName, id: state.selectedStopID})
        setDirection({name: state.selectedDirectionName, id: state.selectedDirectionID})
    }, [state.selectedDirectionID, state.selectedLineID, state.selectedStopID])

    return (
        <div class="pick-lists">
            <PickList 
                key='line' 
                type='line' 
                items={state.routes} 
                itemSelected={
                    (selectedLineID, selectedLineName, directions) => { 
                        dispatch({type: ACTIONS.SELECT_LINE, data: {selectedLineID, selectedLineName, directions}})
                    }
                }
                >
            </PickList>
            <PickList 
                key='stops' 
                type='stops' 
                items={state.stops} 
                itemSelected={
                    (selectedStopID, selectedStopName) => { 
                        dispatch({type: ACTIONS.SELECT_STOP, data: {selectedStopID, selectedStopName}})
                    }
                }
                >

            </PickList>
            <PickList 
                key='direction' 
                type='direction' 
                items={state.showDirections? state.directions: []} 
                itemSelected={
                    (selectedDirectionID, selectedDirectionName) => {
                        dispatch({type: ACTIONS.SELECT_DIRECTION, data: {selectedDirectionID, selectedDirectionName}})
                    }
                }>
            </PickList>
        </div>
    )
}
