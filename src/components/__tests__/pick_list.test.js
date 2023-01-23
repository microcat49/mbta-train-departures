import {render, fireEvent, waitFor} from '@testing-library/react'

import PickList from '../pick_list'

describe('Testing the pick list component', () => {
    const renderPage = (type, items, itemSelected) => {
        return render(
            <PickList type={type} items={items} itemSelected={itemSelected}/>
        )
    }

    it('The setID function calls the setStop function with the correct information', () => {
        const mockCallback = jest.fn();

        const items = [{id: 1, attributes: {name: 'Alewife'}}]
        const page = renderPage('stops', items, mockCallback)

        fireEvent.click(page.getByText('Alewife'))

        waitFor(() => mockCallback.toHaveBeenCalledWith({id: 1, "name": "Alewife"}))
    })

    it('The setID function calls the setSelectedLine function with the correct information', () => {
        const mockCallback = jest.fn();

        const items = [{id: 1, attributes: {long_name: 'Red Line', direction_names: ['North', 'South']}}]
        const page = renderPage('line', items, mockCallback)

        fireEvent.click(page.getByText('Red Line'))

        waitFor(() => mockCallback.toHaveBeenCalledWith({id: 1, "directions": ["North", "South"]}))
    })

    it('The setID function calls the setDirection function with the correct information', () => {
        const mockCallback = jest.fn();

        const items = ["North", "South"]
        const page = renderPage('direction', items, mockCallback)

        fireEvent.click(page.getByText('North'))

        waitFor(() => mockCallback.toHaveBeenCalledWith({id: 0, name: "North"}))
    })

}) 

