import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null,
    sub: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.sub = action.payload.sub;
        },
        getUser: (state, action) => {},
    },
})

// Action creators are generated for each case reducer function
export const {setUser, getUser} = userSlice.actions
export const selectName = (state) => state.user.name
export const selectSub = (state) => state.user.sub
export default userSlice.reducer