import {put, select, call} from "redux-saga/effects";
import {selectCancelled, setCancelled, setDataProcessing} from "@/slices/dataSlice";
import {requestGetScript, requestRunScript} from "@/sagas/handlers/data";
import {addHistory} from "@/slices/fileSlice";

export function* handleSendRequest(action) {
    yield put(setDataProcessing({dataProcessing: true}));
    if (yield checkCancelled()) return;
    try {
        const scriptResponse = yield call(requestGetScript, {
            request: action.payload.request,
            headers: action.payload.headers
        });
        if (scriptResponse.status !== 200) {
            console.log(scriptResponse)
            yield put(setDataProcessing({dataProcessing: false}));
            return;
        }
        if (yield checkCancelled()) return;
        const script = scriptResponse.data;
        const runResponse = yield call(requestRunScript, {
            generatedFunction: script,
            headers: action.payload.headers,
            entries: action.payload.entries,
            extraFiles: action.payload.extraFiles,
        });
        if (runResponse.status !== 200) {
            console.log(runResponse)
            yield put(setDataProcessing({dataProcessing: false}));
            return;
        }
        if (yield checkCancelled()) return;
        const {headers, entries} = runResponse.data;
        yield put(addHistory({headers: headers, entries: entries, request: action.payload.request, name: action.payload.fileName}))
        yield put(setDataProcessing({dataProcessing: false}));
    }
    catch (error) {
        console.log(error);
        yield put(setDataProcessing({dataProcessing: false}));
    }
}

function* checkCancelled() {
    const cancelled = yield select(selectCancelled);
    if (cancelled) {
        yield put(setCancelled({cancelled: false}));
        yield put(setDataProcessing({dataProcessing: false}));
        return true;
    }
    return false;
}