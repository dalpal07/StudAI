import { call, put } from 'redux-saga/effects';
import {requestGetSaved, requestSave} from "@/sagas/requests/file";
import {addSaved, setSaved, updateCurrentHistoryIndexNext, updateHistory} from "@/slices/fileSlice";
export function* handleGetSaved(action) {
    try {
        const response = yield call(requestGetSaved, action.payload.id);
        const { data } = response;
        yield put(setSaved(data));
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