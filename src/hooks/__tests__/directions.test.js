import { renderHook } from '@testing-library/react-hooks'

import useDirections from '../directions'

describe('Test the directions hook', () => {
    it('Does not return a list of directions while a line is not selected', () => {
        const { result } = renderHook(() => useDirections())


    })
})