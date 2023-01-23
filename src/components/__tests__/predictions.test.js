import {render, act, waitFor} from '@testing-library/react'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import Prediction from '../prediction'

import { MBTA_URL } from '../../api/settings'

import {StopContext} from '../../data/stop'
import {LineContext} from '../../data/line'
import {DirectionContext} from '../../data/direction'

describe('Predictions component', () => {
    let mock; 

    beforeEach(() => {
        mock = new MockAdapter(axios)
    })

    const renderPage = (stop, direction, line) => {
        return render(
            <DirectionContext.Provider value={{selectedDirection: direction}}>
                <LineContext.Provider value={{selectedLine: line}}>
                    <StopContext.Provider value={{selectedStop: stop}}>
                        <Prediction />
                    </StopContext.Provider>
                </LineContext.Provider>
            </DirectionContext.Provider>
        )
    }

    it('able to display a prediction with all the correct information', async () => {

        mock.onGet(`${MBTA_URL}/predictions?filter%5Bstop%5D=alewife-line&filter%5Broute%5D=red&filter%5Bdirection_id%5D=0&sort=departure_time`).reply(200, {
            data: [ {attributes: {departure_time:'2023-01-20T16:37:11-05:00', status: 'Train is two stops away'}} ]
        });

        let page;
        act(() => {
            page = renderPage({name: 'Alewife', id: 'alewife-line'}, {name: 'North', id: 0}, {name: 'Red Line', id: 'red'})
        });

        await waitFor(() => page.getByText('Estimated Departure Time: 4:37:11 PM'))
        page.getByText("Stop: Alewife")
        page.getByText("Direction: North")
        page.getByText("Status: Train is two stops away")

    })

    it('when there are no predictions returned it should display unknown', async () => {

        mock.onGet(`${MBTA_URL}/predictions?filter%5Bstop%5D=alewife-line&filter%5Broute%5D=red&filter%5Bdirection_id%5D=alewife-line&sort=departure_time`).reply(200, {
            data: []
        });

        let page;
        act(() => {
            page = renderPage({'name': 'Alewife', id: 'alewife-line'}, {name: 'North', id: 0}, {name: 'Red Line', id: 'red'})
        });

        await waitFor(() => page.getByText('Estimated Departure Time: Unknown'))
        page.getByText("Stop: Alewife")
        page.getByText("Direction: North")
    })

    it('does not display information when there is no stop data', async () => {

        mock.onGet(`${MBTA_URL}/predictions?filter%5Bstop%5D=alewife-line&filter%5Broute%5D=red&filter%5Bdirection_id%5D=0&sort=departure_time`).reply(200, {
            data: [ {attributes: {departure_time: '2023-01-20T16:37:11-05:00'}} ]
        });

        let page;
        act(() => {
            page = renderPage({}, {name: 'North', id: 0}, {name: 'Red Line', id: 'red'})
        });

        await waitFor(() => page.getByText('Estimated Departure Time:'))
        page.getByText("Stop:")
        page.getByText("Direction:")
    })

    it('does not display information when there is no direction data', async () => {

        mock.onGet(`${MBTA_URL}/predictions?filter%5Bstop%5D=alewife-line&filter%5Broute%5D=red&filter%5Bdirection_id%5D=0&sort=departure_time`).reply(200, {
            data: [ {attributes: {departure_time: '2023-01-20T16:37:11-05:00'}} ]
        });

        let page;
        act(() => {
            page = renderPage({'name': 'Alewife', id: 'alewife-line'}, {}, {name: 'Red Line', id: 'red'})
        });

        await waitFor(() => page.getByText('Estimated Departure Time:'))
        page.getByText("Stop: Alewife")
        page.getByText("Direction:")
    })

    it('will display the last stop copy when departure time is null', async () => {

        mock.onGet(`${MBTA_URL}/predictions?filter%5Bstop%5D=alewife-line&filter%5Broute%5D=red&filter%5Bdirection_id%5D=0&sort=departure_time`).reply(200, {
            data: [ {attributes: {departure_time: null}} ]
        });

        let page;
        act(() => {
            page = renderPage({'name': 'Alewife', id: 'alewife-line'}, {name: 'North', id: 0}, {name: 'Red Line', id: 'red'})
        });

        await waitFor(() => page.getByText('Estimated Departure Time: Trains do not depart from this stop'))
        page.getByText("Stop: Alewife")
        page.getByText("Direction: North")
    })
    
})