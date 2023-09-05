import {call, put, select} from 'redux-saga/effects';
import {requestGetFile, requestGetSaved, requestSave} from "@/sagas/requests/file";
import {
    addFileToHistories,
    addSaved, setHistoriesIndex,
    setSaved,
    updateCurrentHistoryIndexNext,
    updateEdited,
    updateHistory
} from "@/slices/fileSlice";
import {
    getFileEntries,
    getFileExtension,
    getFileHeaders,
    readCsvFile,
    readXlsxFile
} from "@/public/functions/ExtractFileData";
import {downloadFile} from "@/public/functions/DownloadFile";

export function* handleGetSaved(action) {
    try {
        const response = yield call(requestGetSaved, action.payload.id);
        const { data } = response;
        yield put(setSaved({...data}));
    } catch (error) {
        console.log(error);
    }
}

export function* handleSave(action) {
    try {
        const response = yield call(requestSave, action.payload);
        const { data } = response;
        yield put(addSaved(data));
        yield put(updateEdited({indexSaved: action.payload.indexSaved}));
    } catch (error) {
        console.log(error);
    }
}

export function* handleAddHistory(action) {
    try {
        yield put(updateCurrentHistoryIndexNext())
        yield put(updateHistory(action.payload));
    } catch (error) {
        console.log(error);
    }
}

function* getFileHeadersAndEntries(fileName, id) {
    const response = yield call(requestGetFile, fileName, id);
    const { data } = response;
    let headers = data.headers;
    let entries = data.entries;
    for (let i = 0; i < headers.length; i++) {
        if (headers[i].includes(",") && headers[i][0] !== "\"") {
            headers[i] = "\"" + headers[i] + "\"";
        }
    }
    for (let i = 0; i < entries.length; i++) {
        for (let j = 0; j < entries[i].length; j++) {
            if (entries[i][j].includes(",") && entries[i][j][0] !== "\"") {
                entries[i][j] = "\"" + entries[i][j] + "\"";
            }
        }
    }
    return {headers: headers, entries: entries};
}

function* getFile(fileName, id) {
    const response = yield call(requestGetFile, fileName, id);
    const { data } = response;
    let headers = data.headers;
    let entries = data.entries;
    for (let i = 0; i < headers.length; i++) {
        if (headers[i].includes(",") && headers[i][0] !== "\"") {
            headers[i] = "\"" + headers[i] + "\"";
        }
    }
    for (let i = 0; i < entries.length; i++) {
        for (let j = 0; j < entries[i].length; j++) {
            if (entries[i][j].includes(",") && entries[i][j][0] !== "\"") {
                entries[i][j] = "\"" + entries[i][j] + "\"";
            }
        }
    }
    const content = headers.join(",") + "\n" + entries.map((entry) => entry.join(",")).join("\n");
    return new File([content], fileName, {type: "text/plain"});
}

function* handleFileChange(file) {
    let maxFileSizeBytes = 200 * 1024;
    if (file.size > maxFileSizeBytes) {
        alert("File is too large. Please upload a file less than " + (maxFileSizeBytes) / 1024 + "KB.")
        return
    }
    const fileExtension = getFileExtension(file.name);
    if (fileExtension === "csv") {
        const content = yield readCsvFile(file)
        const headers = getFileHeaders(content)
        const entries = getFileEntries(content)
        yield put(addFileToHistories({headers: headers, entries: entries, name: file.name}));
    }
    else if (fileExtension === "xlsx") {
        const content = yield readXlsxFile(file)
        const headers = getFileHeaders(content)
        const entries = getFileEntries(content)
        yield put(addFileToHistories({headers: headers, entries: entries, name: file.name}));
    }
    else {
        alert("Invalid file type. Please upload a .csv or .xlsx file.")
    }
}

export function* handleOpenFile(action) {
    try {
        const histories = yield select((state) => state.file.histories);
        let found = false;
        for (let i = 0; i < histories.length; i++) {
            if (histories[i].name === action.payload.fileName) {
                found = true;
                break;
            }
        }
        if (!found) {
            const file = yield call(getFile, action.payload.fileName, action.payload.id);
            yield call(handleFileChange, file);
        }
        yield put(setHistoriesIndex({name: action.payload.fileName}));
    } catch (error) {
        console.log(error);
    }
}

export function* handleDownload(action) {
    try {
        const histories = yield select((state) => state.file.histories);
        const historiesIndex = action.payload.historiesIndex;
        let headers;
        let entries;
        if (historiesIndex === -1) {
            const data = yield call(getFileHeadersAndEntries, action.payload.fileName, action.payload.id);
            headers = data.headers;
            entries = data.entries;
        }
        else {
            headers = histories[historiesIndex].history[histories[historiesIndex].historyIndex].headers;
            entries = histories[historiesIndex].history[histories[historiesIndex].historyIndex].entries;
        }
        const content = headers.join(",") + "\n" + entries.map((entry) => entry.join(",")).join("\n");
        downloadFile(content, action.payload.fileName);
    } catch (e) {
        console.log(e)
    }
}