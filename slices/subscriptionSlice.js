import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: null,
    date: null,
    cancel_at_end: null,
    requests: null,
}

export const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        setSubscription: (state, action) => {
            return {
                ...state,
                type: action.payload.type,
                date: action.payload.date,
                cancel_at_end: action.payload.cancel_at_end,
                requests: action.payload.requests,
            }
        },
        getSubscription: (state, action) => {},
        getStripeSubscription: (state, action) => {},
        addRequest: (state, action) => {
            return {
                ...state,
                requests: action.payload.requests,
            }
        },
        cancelSubscription: (state, action) => {},
        updateCancelAtEnd: (state, action) => {
            return {
                ...state,
                cancel_at_end: action.payload.cancel_at_end,
            }
        },
        resumeSubscription: (state, action) => {},
    },
})

// Action creators are generated for each case reducer function
export const {
    setSubscription,
    getSubscription,
    getStripeSubscription,
    setStripeSubscription,
    addRequest,
    cancelSubscription,
    updateCancelAtEnd,
    resumeSubscription,
} = subscriptionSlice.actions
export const selectType = (state) => state.subscription.type
export const selectDate = (state) => state.subscription.date
export const selectRequests = (state) => state.subscription.requests
export const selectProductAccess = (state) => {
    const type = state.subscription.type;
    switch (type) {
        case "Early Access":
            if (state.subscription.requests === null) {
                return false;
            }
            return state.subscription.requests < 25;
        case "Standard":
            if (state.subscription.requests === null) {
                return false;
            }
            return state.subscription.requests < 150;
        case "Unlimited":
            return true;
        case "Owner":
            return true;
        default:
            return false;
    }
}
export const selectCancelAtEnd = (state) => state.subscription.cancel_at_end
export default subscriptionSlice.reducer