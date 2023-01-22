import {render, fireEvent} from '@testing-library/react'

import PickList from '../pick_list'

import {StopContext} from '../../data/stop'
import {LineContext} from '../../data/line'
import {DirectionContext} from '../../data/direction'

describe('Testing the pick list component', () => {
    const renderPage = (type, items, stop, direction, line) => {
        return render(
            <DirectionContext.Provider value={{setDirection: direction}}>
                <LineContext.Provider value={{setSelectedLine: line}}>
                    <StopContext.Provider value={{setStop: stop}}>
                        <PickList type={type} items={items}/>
                    </StopContext.Provider>
                </LineContext.Provider>
            </DirectionContext.Provider>
        )
    }

    it('The setID function calls the setStop function with the correct information', () => {
        const mockCallback = jest.fn();

        const items = [{id: 1, attributes: {name: 'Alewife'}}]
        const page = renderPage('stops', items, mockCallback, null, null)

        fireEvent.click(page.getByText('Alewife'))

        expect(mockCallback).toHaveBeenCalledWith({id: 1, "name": "Alewife"})
    })

    it('The setID function calls the setSelectedLine function with the correct information', () => {
        const mockCallback = jest.fn();

        const items = [{id: 1, attributes: {long_name: 'Red Line', direction_names: ['North', 'South']}}]
        const page = renderPage('line', items, null, null, mockCallback)

        fireEvent.click(page.getByText('Red Line'))

        expect(mockCallback).toHaveBeenCalledWith({id: 1, "directions": ["North", "South"]})
    })

    it('The setID function calls the setDirection function with the correct information', () => {
        const mockCallback = jest.fn();

        const items = ["North", "South"]
        const page = renderPage('direction', items, null, mockCallback, null)

        fireEvent.click(page.getByText('North'))

        expect(mockCallback).toHaveBeenCalledWith({id: 0, name: "North"})
    })

}) 

