import {render} from '@testing-library/react'

import getPrediction from '../../api/prediction'

import Prediction from '../prediction'

import {StopContext} from '../../data/stop'
import {LineContext} from '../../data/line'
import {DirectionContext} from '../../data/direction'

import usePrediction from '../../hooks/prediction'

jest.mock('../../hooks/prediction')

describe('Testing the predictions page', () => {
    let page;
    beforeEach(() => {
        page = render(
            <DirectionContext.Provider value={{name: 'North'}}>
                <LineContext.Provider value={{}}>
                    <StopContext.Provider value={{name: 'Alewife'}}>
                        <Prediction />
                    </StopContext.Provider>
                </LineContext.Provider>
            </DirectionContext.Provider>
        )
    })

    it('something', () => {
        usePrediction.mockResolvedValue({attributes: {
            arrival_time: '2023-01-20T16:37:11-05:00'
        }})

        page.getByText('Estimated Arrival Time: 4:37:11 PM')

    })
    
})