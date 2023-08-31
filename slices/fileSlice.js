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
            const fileNames = action.payload.fileNames;
            const daysAgo = action.payload.daysAgo;
            if (fileNames.length !== daysAgo.length) {
                return state;
            }
            const saved = [];
            for (let i = 0; i < fileNames.length; i++) {
                saved.push({
                    name: fileNames[i],
                    lastUpdated: daysAgo[i] === 0 ? "Today" : daysAgo[i] === 1 ? "Yesterday" : daysAgo[i] + " days ago",
                });
            }
            return {
                ...state,
                saved: saved,
            };
        },
        getSaved: (state, action) => {},
        addSaved: (state, action) => {
            const matchingIndex = state.saved.indexOf(action.payload.fileName);
            if (matchingIndex !== -1) {
                const updatedSave = {
                    ...state.saved[matchingIndex],
                    lastUpdated: "Today",
                }
                let copySaved = [...state.saved];
                const updatedSaved = [...copySaved.slice(0, matchingIndex), updatedSave, ...copySaved.slice(matchingIndex + 1)];
                return {
                    ...state,
                    saved: updatedSaved,
                };
            }
            const newSave = {
                name: action.payload.fileName,
                lastUpdated: "Today",
            }
            return {
                ...state,
                saved: [...state.saved, newSave],
            };
        },
        save: (state, action) => {},
        openFile: (state, action) => {},
    },
})

// Action creators are generated for each case reducer function
export const {setHistory, updateCurrentHistoryIndexNext, updateHistory, addHistory, clearHistory, nextHistoryIndex, prevHistoryIndex, setSaved, getSaved, addSaved, save, openFile} = fileSlice.actions
export const selectCurrentFileName = state => state.file.history[state.file.historyIndex].name
export const selectCurrentFileHeaders = state => state.file.history[state.file.historyIndex].headers
export const selectCurrentFileEntries = state => state.file.history[state.file.historyIndex].entries
export const selectCurrentFileRequest = state => state.file.history[state.file.historyIndex].request
export const selectDisabledPrev = state => state.file.history[state.file.historyIndex].prev === null
export const selectDisabledNext = state => state.file.history[state.file.historyIndex].next === null
export const selectSaved = state => state.file.saved
export default fileSlice.reducer