import { renderHook, waitFor } from '@testing-library/react'

import usePrediction from '../prediction'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import {StopContext} from '../../data/stop'
import {LineContext} from '../../data/line'
import {DirectionContext} from '../../data/direction'

import { MBTA_URL } from '../../api/settings'

describe('Predictions Hook', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios)
    })

    afterEach(() => {
        mock.reset()
    })

    const page = (direction={}, selectedLine={}, stop={}) => {
        return ({ children }) => (
            <DirectionContext.Provider value={{direction: direction}}>
                <LineContext.Provider value={{selectedLine: selectedLine}}>
                    <StopContext.Provider value={{selectedStop: stop}}>
                        { children }
                    </StopContext.Provider>
                </LineContext.Provider>
            </DirectionContext.Provider>
        )    
    }
    it('returns null when direction, selected line, and stop are empty objects', () => {
        const wrapper = page()
        const { result }  = renderHook(() => usePrediction(), { wrapper })

        expect(result.current).toEqual(null)
    })

    it('returns a result with a departure time when direction, selected line, and stop are empty objects', () => {
        mock.onGet(`${MBTA_URL}/predictions?filter%5Bstop%5D=alewife-line&filter%5Broute%5D=red&filter%5Bdirection_id%5D=0&sort=departure_time`).reply(200, {
            data: [ {attributes: {departure_time: '2023-01-20T16:37:11-05:00'}} ]
        });

        const wrapper = page({id: 1}, {id: 'red'}, {id: 'alewife-line'})
        const { result }  = renderHook(() => usePrediction(), {wrapper})

        waitFor(() => expect(result.current).toEqual([ {attribues: {departure_time: '2023-01-20T16:37:11-05:00'}} ]))
    })

    it('returns an empty object when the API returns an empty array', () => {
        mock.onGet(`${MBTA_URL}/predictions?filter%5Bstop%5D=alewife-line&filter%5Broute%5D=red&filter%5Bdirection_id%5D=0&sort=departure_time`).reply(200, {
            data: [ {attributes: {departure_time: '2023-01-20T16:37:11-05:00'}} ]
        });

        const wrapper = page({id: 1}, {id: 'red'}, {id: 'alewife-line'})
        const { result }  = renderHook(() => usePrediction(), {wrapper})

        waitFor(() => expect(result.current).toEqual([]))
    })
})