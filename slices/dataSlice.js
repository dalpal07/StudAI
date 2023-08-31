import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataProcessing: false,
    cancelled: false,
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setDataProcessing: (state, action) => {
            return {...state, dataProcessing: action.payload.dataProcessing}
        },
        setCancelled: (state, action) => {
            if (action.payload.cancelled) {
                return {...state, cancelled: action.payload.cancelled, dataProcessing: false}
            }
            return {...state, cancelled: action.payload.cancelled}
        },
        sendRequest: (state, action) => {},
    },
})

// Action creators are generated for each case reducer function
export const {setDataProcessing, setCancelled, sendRequest} = dataSlice.actions
export const selectDataProcessing = state => state.data.dataProcessing
export const selectCancelled = state => state.data.cancelled
export default dataSlice.reducer