import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: null,
    date: null,
    requests: null,
    productAccess: null,
}

export const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        setSubscription: (state, action) => {
            state.type = action.payload.type;
            state.date = action.payload.date;
            state.requests = action.payload.requests;
            state.productAccess = action.payload.productAccess;
        },
        getSubscription: (state, action) => {},
        addRequest: (state) => {
            state.requests += 1;
        }
    },
})

// Action creators are generated for each case reducer function
export const {setSubscription, getSubscription, addRequest} = subscriptionSlice.actions
export const selectType = (state) => state.subscription.type
export const selectDate = (state) => state.subscription.date
export const selectRequests = (state) => state.subscription.requests
export const selectProductAccess = (state) => state.subscription.productAccess
export default subscriptionSlice.reducer