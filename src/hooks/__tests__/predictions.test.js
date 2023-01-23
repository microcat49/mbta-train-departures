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
                    <StopContext.Provider value={{stop: stop}}>
                        { children }
                    </StopContext.Provider>
                </LineContext.Provider>
            </DirectionContext.Provider>
        )    
    }
    it('returns an empty array when direction, selected line, and stop are empty objects', () => {
        const wrapper = page()
        const { result }  = renderHook(() => usePrediction(), { wrapper })

        expect(result.current).toEqual([])
    })

    it('returns an empty array when direction, selected line, and stop are empty objects', () => {
        mock.onGet(`${MBTA_URL}/predictions?filter%5Bstop%5D=1&filter%5Broute%5D=1&filter%5Bdirection_id%5D=1&sort=arrival_time`).reply(200, {
            data: [ {attributes: {arrival_time: '2023-01-20T16:37:11-05:00'}} ]
        });

        const wrapper = page({name:"North", id: 1}, {id: 1}, {id: 1})
        const { result }  = renderHook(() => usePrediction(), {wrapper})

        waitFor(() => expect(result.current).toEqual([ {attribues: {arrival_time: '2023-01-20T16:37:11-05:00'}} ]))
    })
})