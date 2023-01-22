import {render, fireEvent} from '@testing-library/react'

import Item from '../item'

describe('Testing the item component', () => {
    const renderPage = (text, getId) => {
        return render(
            <Item name={text} setId={getId} />
        )
    }

    it('We are able to display the test of an item', () => {
        const page = renderPage('Alewife')

        page.getByText('Alewife')        
    })

    it('When the item is clicked it calls the function', () => {

        const mockCallback = jest.fn();

        const page = renderPage('Alewife', mockCallback)

        fireEvent.click(page.getByText('Alewife'))

        expect(mockCallback).toHaveBeenCalledTimes(1)
    })    

})
