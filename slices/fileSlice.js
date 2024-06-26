import {createSelector, createSlice} from '@reduxjs/toolkit'
import {useSelector} from "react-redux";

/*
* histories: an array of objects with the following properties:
*    historyIndex: the index of the history in the history array
*    name: the name of the file
*    history: the history object
*       headers: the headers of the file at the instance of the history
*       entries: the entries of the file at the instance of the history
*       prev: the index of the previous history in the history array
*       next: the index of the next history in the history array
*       edited: whether the history has been edited since the last save
* historiesIndex: the index of the saved history in the savedHistories array
* saved: an array of objects with the following properties:
*     name: the name of the file
*     lastUpdated: the last time the file was saved
*/


const initialState = {
    histories: [],
    historiesIndex: -1,
    saved: [],
}

export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        renameFile(state, action) {},
        updateFileName(state, action) {
            const oldFileName = action.payload.oldFileName;
            const newFileName = action.payload.newFileName;
            const updatedHistories = [];
            for (let i = 0; i < state.histories.length; i++) {
                if (state.histories[i].name === oldFileName) {
                    updatedHistories.push({
                        ...state.histories[i],
                        name: newFileName,
                    });
                    continue;
                }
                updatedHistories.push(state.histories[i]);
            }
            const updatedSaved = [];
            for (let i = 0; i < state.saved.length; i++) {
                if (state.saved[i].name === oldFileName) {
                    updatedSaved.push({
                        ...state.saved[i],
                        name: newFileName,
                    });
                    continue;
                }
                updatedSaved.push(state.saved[i]);
            }
            return {
                ...state,
                histories: updatedHistories,
                saved: updatedSaved,
            }
        },
        openFile(state, action) {},
        downloadFile(state, action) {},
        deleteFile(state, action) {},
        removeFile(state, action) {
            const fileName = action.payload.fileName;
            const updatedHistories = [];
            let newHistoriesIndex = state.historiesIndex;
            for (let i = 0; i < state.histories.length; i++) {
                if (state.histories[i].name === fileName) {
                    if (state.historiesIndex === i) {
                        if (i === 0 && state.histories.length === 1) {
                            newHistoriesIndex = -1;
                        }
                        else {
                            newHistoriesIndex--;
                        }
                    }
                    continue;
                }
                updatedHistories.push(state.histories[i]);
            }
            const updatedSaved = [];
            for (let i = 0; i < state.saved.length; i++) {
                if (state.saved[i].name === fileName) {
                    continue;
                }
                updatedSaved.push(state.saved[i]);
            }
            return {
                ...state,
                histories: updatedHistories,
                saved: updatedSaved,
                historiesIndex: newHistoriesIndex,
            }
        },
        setHistoriesIndex(state, action) {
            let index = -1;
            for (let i = 0; i < state.histories.length; i++) {
                if (state.histories[i].name === action.payload.name) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                return {
                    ...state,
                    historiesIndex: -1,
                }
            }
            return {
                ...state,
                historiesIndex: index,
            }
        },
        addFileToHistories(state, action) {
            const initialHistory = {
                headers: action.payload.headers,
                entries: action.payload.entries,
                prev: null,
                next: null,
                edited: false,
            }
            const historiesEntry = {
                name: action.payload.name,
                historyIndex: 0,
                history: [initialHistory],
            }
            return {
                ...state,
                histories: [...state.histories, historiesEntry],
            }
        },
        discardChanges: (state, action) => {
            const i = state.historiesIndex;
            const currentIndex = state.histories[i].historyIndex;
            const prev = state.histories[i].history[currentIndex].prev;
            const next = state.histories[i].history[currentIndex].next;
            const newHistoryIndex = prev !== null ? prev : next;
            const updatedHistory = [];
            for (let k = 0; k < state.histories[i].history.length; k++) {
                if (k === prev) {
                    updatedHistory.push({
                        ...state.histories[i].history[k],
                        next: next,
                    });
                    continue
                }
                if (k === next) {
                    updatedHistory.push({
                        ...state.histories[i].history[k],
                        prev: prev,
                    });
                    continue
                }
                updatedHistory.push(state.histories[i].history[k]);
            }
            const updatedHistories = [];
            for (let k = 0; k < state.histories.length; k++) {
                if (k === i) {
                    updatedHistories.push({
                        ...state.histories[k],
                        history: updatedHistory,
                        historyIndex: newHistoryIndex,
                    });
                } else {
                    updatedHistories.push(state.histories[k]);
                }
            }
            return {
                ...state,
                histories: updatedHistories,
            }
        },
        updateCurrentHistoryIndexNext: (state) => {
            const i = state.historiesIndex;
            const j = state.histories[i].historyIndex;
            state.histories[i].history[j].next = state.histories[i].history.length;
        },
        updateHistory: (state, action) => {
            const i = state.historiesIndex;
            const prev = state.histories[i].historyIndex;
            const historyInstance = {
                headers: action.payload.headers,
                entries: action.payload.entries,
                prev: prev,
                next: null,
                edited: true
            }
            const updatedHistory = [...state.histories[i].history, historyInstance];
            const updatedHistories = [];
            for (let j = 0; j < state.histories.length; j++) {
                if (j === i) {
                    updatedHistories.push({
                        ...state.histories[j],
                        history: updatedHistory,
                        historyIndex: updatedHistory.length - 1,
                    });
                } else {
                    updatedHistories.push(state.histories[j]);
                }
            }
            return {
                ...state,
                histories: updatedHistories,
            };
        },
        nextHistoryIndex: (state) => {
            const i = state.historiesIndex;
            const j = state.histories[i].historyIndex;
            const nextHistoryIndex = state.histories[i].history[j].next;
            if (nextHistoryIndex !== null) {
                const updatedHistory = {
                    ...state.histories[i],
                    historyIndex: nextHistoryIndex,
                }
                const updatedHistories = [];
                for (let k = 0; k < state.histories.length; k++) {
                    if (k === i) {
                        updatedHistories.push(updatedHistory);
                    } else {
                        updatedHistories.push(state.histories[k]);
                    }
                }
                return {
                    ...state,
                    histories: updatedHistories,
                };
            }
            return state;
        },
        prevHistoryIndex: (state) => {
            const i = state.historiesIndex;
            const j = state.histories[i].historyIndex;
            const prevHistoryIndex = state.histories[i].history[j].prev;
            if (prevHistoryIndex !== null) {
                const updatedHistory = {
                    ...state.histories[i],
                    historyIndex: prevHistoryIndex,
                }
                const updatedHistories = [];
                for (let k = 0; k < state.histories.length; k++) {
                    if (k === i) {
                        updatedHistories.push(updatedHistory);
                    } else {
                        updatedHistories.push(state.histories[k]);
                    }
                }
                return {
                    ...state,
                    histories: updatedHistories,
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
            let matchingIndex = -1;
            for (let i = 0; i < state.saved.length; i++) {
                if (state.saved[i].name === action.payload.fileName) {
                    matchingIndex = i;
                    break;
                }
            }
            if (matchingIndex === -1) {
                const newSave = {
                    name: action.payload.fileName,
                    lastUpdated: "Today",
                }
                return {
                    ...state,
                    saved: [newSave, ...state.saved],
                }
            }
            else {
                const updatedSave = {
                    ...state.saved[matchingIndex],
                    lastUpdated: "Today",
                }
                let copySaved = [...state.saved];
                const updatedSaved = [...copySaved.slice(0, matchingIndex), ...copySaved.slice(matchingIndex + 1)];
                return {
                    ...state,
                    saved: [updatedSave, ...updatedSaved],
                };
            }
        },
        save: (state, action) => {},
        updateEdited: (state, action) => {
            const i = state.historiesIndex;
            const j = state.histories[i].historyIndex;
            const originalHistory = state.histories[i].history;
            const updatedHistory = []
            for (let k = 0; k < originalHistory.length; k++) {
                if (j === k) {
                    updatedHistory.push({
                        ...state.histories[i].history[k],
                        edited: false,
                    })
                } else {
                    updatedHistory.push({
                        ...state.histories[i].history[k],
                        edited: true,
                    });
                }
            }
            const historyEntry = {
                ...state.histories[i],
                history: updatedHistory,
            }
            const updatedHistories = [];
            for (let k = 0; k < state.histories.length; k++) {
                if (k === i) {
                    updatedHistories.push(historyEntry);
                } else {
                    updatedHistories.push(state.histories[k]);
                }
            }
            return {
                ...state,
                histories: updatedHistories,
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    renameFile,
    updateFileName,
    openFile,
    downloadFile,
    deleteFile,
    removeFile,
    setHistoriesIndex,
    nextHistoryIndex,
    updateCurrentHistoryIndexNext,
    updateEdited,
    updateHistory,
    prevHistoryIndex,
    addSaved,
    getSaved,
    setSaved,
    addFileToHistories,
    discardChanges,
    save
} = fileSlice.actions
const historiesIndex = state => state.file.historiesIndex;
const histories = state => state.file.histories;
export const selectCurrentFileName = createSelector([historiesIndex, histories], (ind, arr) => {
    if (ind === -1) {
        return null;
    }
    return arr[ind].name;
});
export const selectCurrentFileHeaders = createSelector([historiesIndex, histories], (ind, arr) => {
    if (ind === -1) {
        return [];
    }
    return arr[ind].history[arr[ind].historyIndex].headers;
});
export const selectCurrentFileEntries = createSelector([historiesIndex, histories], (ind, arr) => {
    if (ind === -1) {
        return [];
    }
    return arr[ind].history[arr[ind].historyIndex].entries;
});
export const selectCurrentFileEdited = createSelector([historiesIndex, histories], (ind, arr) => {
    if (ind === -1) {
        return false;
    }
    return arr[ind].history[arr[ind].historyIndex].edited;
});
export const selectHistoryIndex = createSelector([historiesIndex, histories], (ind, arr) => {
    if (ind === -1) {
        return -1;
    }
    return arr[ind].historyIndex;
});
export const selectDisabledPrev = createSelector([historiesIndex, histories], (ind, arr) => {
    if (ind === -1) {
        return true;
    }
    return arr[ind].history[arr[ind].historyIndex].prev === null;
});
export const selectDisabledNext = createSelector([historiesIndex, histories], (ind, arr) => {
    if (ind === -1) {
        return true;
    }
    return arr[ind].history[arr[ind].historyIndex].next === null;
});
export const selectSaved = state => state.file.saved
export const selectFileEdited = (fileName) => (state) => {
    const history = state.file.histories.find((entry) => entry.name === fileName);
    if (history) {
        const { historyIndex } = history;
        return history.history[historyIndex].edited;
    }
    return false;
};
export const selectFileHistoriesIndex = (fileName) => (state) => {
    let historiesIndex = -1;
    for (let i = 0; i < state.file.histories.length; i++) {
        if (state.file.histories[i].name === fileName) {
            historiesIndex = i;
            break;
        }
    }
    return historiesIndex;
}
export const selectPendingFiles = state => state.file.pendingFiles

export default fileSlice.reducer