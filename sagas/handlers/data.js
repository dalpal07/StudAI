import {put, select, call} from "redux-saga/effects";
import {selectCancelled, setCancelled, setDataProcessing} from "@/slices/dataSlice";
import {requestGetScript, requestRunScript, requestSetUUID} from "@/sagas/requests/data";
import {updateCurrentHistoryIndexNext, updateHistory} from "@/slices/fileSlice";
import {selectProductAccess} from "@/slices/subscriptionSlice";

export function* handleSendRequest(action) {
    const access = yield select(selectProductAccess);
    if (!access) {
        alert("Please subscribe to a plan to use this feature.")
        return;
    }
    yield put(setDataProcessing({dataProcessing: true}));
    if (yield checkCancelled()) return;
    try {
        const setUUIDResponse = yield call(requestSetUUID, {
            id: action.payload.id,
        });
        if (setUUIDResponse.status !== 200) {
            console.log(setUUIDResponse)
            yield put(setDataProcessing({dataProcessing: false}));
            return;
        }
        if (yield checkCancelled()) return;
        const {uuid} = setUUIDResponse.data;
        const scriptResponse = yield call(requestGetScript, {
            request: action.payload.request,
            headers: action.payload.headers,
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
            uuid: uuid,
            id: action.payload.id,
        });
        if (runResponse.status !== 200) {
            console.log(runResponse)
            yield put(setDataProcessing({dataProcessing: false}));
            return;
        }
        if (yield checkCancelled()) return;
        const {headers, entries} = runResponse.data;
        yield put(updateCurrentHistoryIndexNext());
        yield put(updateHistory({headers: headers, entries: entries, name: action.payload.fileName}))
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
        return true;
    }
    return false;
}