import {takeLatest} from 'redux-saga/effects';
import {getUser} from "@/slices/userSlice";
import {getSubscription} from "@/slices/subscriptionSlice";
import {handleGetUser} from "@/sagas/handlers/user";
import {handleGetSubscription} from "@/sagas/handlers/subscription";
import {handleAddHistory, handleGetSaved, handleSave} from "@/sagas/handlers/file";
import {addHistory, getSaved, save} from "@/slices/fileSlice";
import {sendRequest} from "@/slices/dataSlice";
import {handleSendRequest} from "@/sagas/requests/data";

export function* watcherSaga() {
    yield takeLatest(getUser.toString(), handleGetUser);
    yield takeLatest(getSubscription.toString(), handleGetSubscription);
    yield takeLatest(getSaved.toString(), handleGetSaved);
    yield takeLatest(save.toString(), handleSave);
    yield takeLatest(addHistory.toString(), handleAddHistory);
    yield takeLatest(sendRequest.toString(), handleSendRequest);
}