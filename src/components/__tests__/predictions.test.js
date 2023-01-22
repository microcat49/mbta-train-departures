import {render, act, waitFor} from '@testing-library/react'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import Prediction from '../prediction'

import {StopContext} from '../../data/stop'
import {LineContext} from '../../data/line'
import {DirectionContext} from '../../data/direction'

jest.setTimeout(50000)

describe('Testing the predictions page', () => {
    let mock; 

    beforeEach(() => {
        mock = new MockAdapter(axios)
    })

    const renderPage = (stop, direction, line) => {
        return render(
            <DirectionContext.Provider value={{direction: direction}}>
                <LineContext.Provider value={{selectedLine: line}}>
                    <StopContext.Provider value={{stop: stop}}>
                        <Prediction />
                    </StopContext.Provider>
                </LineContext.Provider>
            </DirectionContext.Provider>
        )
    }

    it('We are able to display a prediction with all the correct information', async () => {

        mock.onGet('https://api-v3.mbta.com/predictions?filter%5Bstop%5D=alewife-line&filter%5Broute%5D=0&filter%5Bdirection_id%5D=0&sort=arrival_time').reply(200, {
            data: [ {attributes: {arrival_time:'2023-01-20T16:37:11-05:00', status: 'Train is two stops away'}} ]
        });

        let page;
        act(() => {
            page = renderPage({'name': 'Alewife', id: 'alewife-line'}, {name: 'North', id: 0}, {id: 0})
        });

        await waitFor(() => page.getByText('Estimated Arrival Time: 4:37:11 PM'))
        page.getByText("Stop: Alewife")
        page.getByText("Direction: North")
        page.getByText("Status: Train is two stops away")

    })

    it('when there is no arrival time we display unknown', async () => {

        mock.onGet('https://api-v3.mbta.com/predictions?filter%5Bstop%5D=alewife-line&filter%5Broute%5D=0&filter%5Bdirection_id%5D=0&sort=arrival_time').reply(200, {
            data: [ {attributes: {arrival_time: null}} ]
        });

        let page;
        act(() => {
            page = renderPage({'name': 'Alewife', id: 'alewife-line'}, {name: 'North', id: 0}, {id: 0})
        });

        await waitFor(() => page.getByText('Estimated Arrival Time: Unknown'))
        page.getByText("Stop: Alewife")
        page.getByText("Direction: North")
    })
    
})