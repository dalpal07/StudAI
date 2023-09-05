import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataProcessing: false,
    dataUpload: false,
    cancelled: false,
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setDataProcessing: (state, action) => {
            return {...state, dataProcessing: action.payload.dataProcessing}
        },
        setDataUpload: (state, action) => {
            return {...state, dataUpload: action.payload.dataUpload}
        },
        setCancelled: (state, action) => {
            if (action.payload.cancelled) {
                return {...state, cancelled: action.payload.cancelled, dataProcessing: false, dataUpload: false}
            }
            return {...state, cancelled: action.payload.cancelled}
        },
        sendRequest: (state, action) => {},
    },
})

// Action creators are generated for each case reducer function
export const {
    setDataProcessing,
    setDataUpload,
    setCancelled,
    sendRequest
} = dataSlice.actions
export const selectDataProcessing = state => state.data.dataProcessing
export const selectDataUpload = state => state.data.dataUpload
export const selectCancelled = state => state.data.cancelled
export default dataSlice.reducer