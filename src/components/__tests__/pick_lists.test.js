import {render, act, waitFor, fireEvent} from '@testing-library/react'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import PickLists from '../pick_lists';

import { MBTA_URL } from '../../api/settings'

import {StopContext} from '../../data/stop'
import {LineContext} from '../../data/line'
import {DirectionContext} from '../../data/direction'

jest.setTimeout(50000)

describe('Pick lists component', () => {
    let mock; 

    beforeEach(() => {
        mock = new MockAdapter(axios)
    })

    afterEach(() => {
        mock.reset();
    })

    const renderPage = (setDirection=()=>{}, setSelectedLine=()=>{}, setStop=()=>{}) => {
        return render(
            <DirectionContext.Provider value={{setSelectedDirection: setDirection}}>
                <LineContext.Provider value={{setSelectedLine: setSelectedLine}}>
                    <StopContext.Provider value={{setSelectedStop: setStop}}>
                        <PickLists />
                    </StopContext.Provider>
                </LineContext.Provider>
            </DirectionContext.Provider>
        )
    }

    it('Is able to render multiple MBTA lines', async () => {
        mock.onGet(`${MBTA_URL}/routes?filter%5Btype%5D=0,1`).reply(200, {
            data: [
                {attributes: {id: 'red', long_name:'Red Line', 'direction_names': ['WEST', 'EAST']}},
                {attributes: {id: 'red', long_name:'Orange Line', 'direction_names': ['WEST', 'EAST']}} 
            ]
        });

        const page = renderPage()

        await waitFor(() => page.getByText("Red Line"))
        page.getByText("Orange Line")
    })

    it('Calls the stops API with the correct query param', async () => {
        mock.onGet(`${MBTA_URL}/routes?filter%5Btype%5D=0,1`).reply(200, {
            data: [ {id: 'red', attributes: {long_name:'Red Line', 'direction_names': ['WEST', 'EAST']}} ]
        });

        mock.onGet(`${MBTA_URL}/stops?filter%5Broute%5D=red`).reply(200, {
            data: [ {attributes: {id: 'alewife-line', name:'Alewife'}} ]
        });

        const page = renderPage()

        await waitFor(() => page.getByText("Red Line"))

        fireEvent.click(page.getByText("Red Line"))

        // If the API did not have the correct query param. It would not match the
        // above mocked API call. Which would in turn fail and this call would fail because
        // there would be no data on the page to find.
        await waitFor(() => page.getByText("Alewife"))

    })

    it('Shows the two directions for the line', async () => {
        mock.onGet(`${MBTA_URL}/routes?filter%5Btype%5D=0,1`).reply(200, {
            data: [ 
                {id: 'red', attributes: {long_name:'Red Line', 'direction_names': ['WEST', 'EAST']}} ]
        });

        mock.onGet(`${MBTA_URL}/stops?filter%5Broute%5D=red`).reply(200, {
            data: [ {attributes: {id: 'alewife-line', name:'Alewife'}} ]
        });

        const page = renderPage()

        await waitFor(() => page.getByText("Red Line"))

        fireEvent.click(page.getByText("Red Line"))

        await waitFor(() => page.getByText("Alewife"))

        fireEvent.click(page.getByText("Alewife"))

        await waitFor(() => page.getByText("WEST"))
        page.getByText("EAST")
    })

    it('the directions dissapear when the a new line is selected', async () => {
        mock.onGet(`${MBTA_URL}/routes?filter%5Btype%5D=0,1`).reply(200, {
            data: [ 
                {id: 'red', attributes: {long_name:'Red Line', 'direction_names': ['WEST', 'EAST']}},
                {attributes: {id: 'orange', long_name:'Orange Line', 'direction_names': ['WEST', 'EAST']}} 
            ]
        });

        mock.onGet(`${MBTA_URL}/stops?filter%5Broute%5D=red`).reply(200, {
            data: [ {attributes: {id: 'alewife-line', name:'Alewife'}} ]
        });

        const page = renderPage()

        await waitFor(() => page.getByText("Red Line"))

        fireEvent.click(page.getByText("Red Line"))

        await waitFor(() => page.getByText("Alewife"))

        fireEvent.click(page.getByText("Alewife"))

        await waitFor(() => page.getByText("WEST"))
        page.getByText("EAST")

        fireEvent.click(page.getByText("Orange Line"))

        expect(page.queryByText("WEST")).toBeFalsy()
    })

    it('the stops change when the a new line is selected', async () => {
        mock.onGet(`${MBTA_URL}/routes?filter%5Btype%5D=0,1`).reply(200, {
            data: [ 
                {id: 'red', attributes: {long_name:'Red Line', 'direction_names': ['WEST', 'EAST']}},
                {id: 'orange', attributes: {long_name:'Orange Line', 'direction_names': ['WEST', 'EAST']}} 
            ]
        });

        mock.onGet(`${MBTA_URL}/stops?filter%5Broute%5D=red`).reply(200, {
            data: [ {attributes: {id: 'alewife-line', name:'Alewife'}} ]
        });

        mock.onGet(`${MBTA_URL}/stops?filter%5Broute%5D=orange`).reply(200, {
            data: [ {attributes: {id: 'malden-line', name:'Malden'}} ]
        });

        const page = renderPage()

        await waitFor(() => page.getByText("Red Line"))

        fireEvent.click(page.getByText("Red Line"))

        await waitFor(() => page.getByText("Alewife"))

        fireEvent.click(page.getByText("Orange Line"))

        await waitFor(() => page.getByText("Malden"))
    })

    it('it sets the context data for the line when a line is selected', async () => {
        mock.onGet(`${MBTA_URL}/routes?filter%5Btype%5D=0,1`).reply(200, {
            data: [ 
                {id: 'red', attributes: {long_name:'Red Line', 'direction_names': ['WEST', 'EAST']}},
            ]
        });

        mock.onGet(`${MBTA_URL}/stops?filter%5Broute%5D=red`).reply(200, {
            data: [ {attributes: {id: 'alewife-line', name:'Alewife'}} ]
        });

        const mockCallbackLine = jest.fn();
        const mockCallbackStop = jest.fn();
        const mockCallbackDirection = jest.fn();

        const page = renderPage(mockCallbackDirection, mockCallbackLine, mockCallbackStop)

        await waitFor(() => page.getByText("Red Line"))

        fireEvent.click(page.getByText("Red Line"))

        expect(mockCallbackLine).toHaveBeenCalledWith({name: 'Red Line', id: 'red'})
        expect(mockCallbackStop).toHaveBeenCalledWith({name: '', id: ''})
        expect(mockCallbackDirection).toHaveBeenCalledWith({name: '', id: ''})
    })

    it('it sets the context data for the line and stop when aline and stop is selected', async () => {
        mock.onGet(`${MBTA_URL}/routes?filter%5Btype%5D=0,1`).reply(200, {
            data: [ 
                {id: 'red', attributes: {long_name:'Red Line', 'direction_names': ['WEST', 'EAST']}}
            ]
        });

        mock.onGet(`${MBTA_URL}/stops?filter%5Broute%5D=red`).reply(200, {
            data: [ {id: 'alewife-line', attributes: {name:'Alewife'}} ]
        });

        const mockCallbackLine = jest.fn();
        const mockCallbackStop = jest.fn();
        const mockCallbackDirection = jest.fn();

        const page = renderPage(mockCallbackDirection, mockCallbackLine, mockCallbackStop)

        await waitFor(() => page.getByText("Red Line"))

        fireEvent.click(page.getByText("Red Line"))

        await waitFor(() => page.getByText("Alewife"))

        fireEvent.click(page.getByText("Alewife"))

        expect(mockCallbackLine).toHaveBeenCalledWith({name: 'Red Line', id: 'red'})
        expect(mockCallbackStop).toHaveBeenCalledWith({name: 'Alewife', id: 'alewife-line'})
        expect(mockCallbackDirection).toHaveBeenCalledWith({name: '', id: ''})
    })

    it('it sets the context data for the line, stop, and direction when a line, stop, and direction is selected', async () => {
        mock.onGet(`${MBTA_URL}/routes?filter%5Btype%5D=0,1`).reply(200, {
            data: [ 
                {id: 'red', attributes: {long_name:'Red Line', 'direction_names': ['WEST', 'EAST']}}
            ]
        });

        mock.onGet(`${MBTA_URL}/stops?filter%5Broute%5D=red`).reply(200, {
            data: [ {id: 'alewife-line', attributes: {name:'Alewife'}} ]
        });

        const mockCallbackLine = jest.fn();
        const mockCallbackStop = jest.fn();
        const mockCallbackDirection = jest.fn();

        const page = renderPage(mockCallbackDirection, mockCallbackLine, mockCallbackStop)

        await waitFor(() => page.getByText("Red Line"))

        fireEvent.click(page.getByText("Red Line"))

        await waitFor(() => page.getByText("Alewife"))

        fireEvent.click(page.getByText("Alewife"))

        await waitFor(() => page.getByText("EAST"))

        fireEvent.click(page.getByText("EAST"))

        waitFor(() => {mockCallbackStop.toHaveBeenCalledWith({name: 'Red Line', id: 'red'})})
        waitFor(() => {mockCallbackStop.toHaveBeenCalledWith({name: 'Alewife', id: 'alewife-line'})})
        waitFor(() => {mockCallbackDirection.toHaveBeenCalledWith({name: 'EAST', id: '1'})})
    })
})