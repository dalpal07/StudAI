import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    history: [
        {
            name: null,
            headers: [],
            entries: [],
            prev: null,
            next: null,
            request: null
        }
    ],
    historyIndex: 0,
    saved: [],
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setHistory: (state, action) => {
            const historyDefaults = {
                request: 'Original Data Set',
                prev: null,
                next: null,
            };
            return {
                ...state,
                history: [{ ...historyDefaults, ...action.payload }],
                historyIndex: 0,
            };
        },
        updateCurrentHistoryIndexNext: (state) => {
            state.history[state.historyIndex].next = state.history.length;
        },
        updateHistory: (state, action) => {
            const prev = state.historyIndex;
            return {
                ...state,
                history: [...state.history, {...action.payload, prev: prev, next: null}],
                historyIndex: state.history.length,
            };
        },
        addHistory: (state, action) => {},
        clearHistory: (state) => {
            return {
                ...state,
                history: [
                    {
                        name: null,
                        headers: [],
                        entries: [],
                        prev: null,
                        next: null,
                        request: null,
                    },
                ],
                historyIndex: 0,
            };
        },
        nextHistoryIndex: (state) => {
            if (state.history[state.historyIndex].next !== null) {
                return {
                    ...state,
                    historyIndex: state.history[state.historyIndex].next,
                };
            }
            return state;
        },
        prevHistoryIndex: (state) => {
            if (state.history[state.historyIndex].prev !== null) {
                return {
                    ...state,
                    historyIndex: state.history[state.historyIndex].prev,
                };
            }
            return state;
        },
        setSaved: (state, action) => {
            return {
                ...state,
                saved: action.payload.fileNames,
            };
        },
        getSaved: (state, action) => {},
        addSaved: (state, action) => {
            if (state.saved.includes(action.payload.fileName)) {
                return state;
            }
            return {
                ...state,
                saved: [...state.saved, action.payload.fileName],
            };
        },
        save: (state, action) => {},
    },
})

// Action creators are generated for each case reducer function
export const {setHistory, updateCurrentHistoryIndexNext, updateHistory, addHistory, clearHistory, nextHistoryIndex, prevHistoryIndex, setSaved, getSaved, addSaved, save} = fileSlice.actions
export const selectCurrentFileName = state => state.file.history[state.file.historyIndex].name
export const selectCurrentFileHeaders = state => state.file.history[state.file.historyIndex].headers
export const selectCurrentFileEntries = state => state.file.history[state.file.historyIndex].entries
export const selectCurrentFileRequest = state => state.file.history[state.file.historyIndex].request
export const selectDisabledPrev = state => state.file.history[state.file.historyIndex].prev === null
export const selectDisabledNext = state => state.file.history[state.file.historyIndex].next === null
export const selectSaved = state => state.file.saved
export default fileSlice.reducer