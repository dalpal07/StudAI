import {call, put} from 'redux-saga/effects';
import {requestGetFile, requestGetSaved, requestSave} from "@/sagas/requests/file";
import {addSaved, setHistory, setSaved, updateCurrentHistoryIndexNext, updateHistory} from "@/slices/fileSlice";
import {
    getFileEntries,
    getFileExtension,
    getFileHeaders,
    readCsvFile,
    readXlsxFile
} from "@/public/functions/ExtractFileData";

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
        yield put(setHistory({headers: headers, entries: entries, name: file.name}));
    }
    else if (fileExtension === "xlsx") {
        console.log("xlsx")
        const content = yield readXlsxFile(file)
        const headers = getFileHeaders(content)
        const entries = getFileEntries(content)
        yield put(setHistory({headers: headers, entries: entries, name: file.name}));
    }
    else {
        alert("Invalid file type. Please upload a .csv or .xlsx file.")
    }
}

export function* handleOpenFile(action) {
    try {
        let file = action.payload.file
        if (!file) {
            file = yield call(getFile, action.payload.fileName, action.payload.id);
        }
        yield call(handleFileChange, file)
    } catch (error) {
        console.log(error);
    }
}