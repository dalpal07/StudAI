import {takeLatest} from 'redux-saga/effects';
import {getUser} from "@/slices/userSlice";
import {getSubscription} from "@/slices/subscriptionSlice";
import {handleGetUser} from "@/sagas/handlers/user";
import {handleGetSubscription} from "@/sagas/handlers/subscription";
import {handleAddHistory, handleGetSaved, handleOpenFile, handleSave} from "@/sagas/handlers/file";
import {getSaved, openFile, save} from "@/slices/fileSlice";
import {sendRequest} from "@/slices/dataSlice";
import {handleSendRequest} from "@/sagas/handlers/data";

export function* watcherSaga() {
    // user
    yield takeLatest(getUser.toString(), handleGetUser);
    // subscription
    yield takeLatest(getSubscription.toString(), handleGetSubscription);
    // file
    yield takeLatest(getSaved.toString(), handleGetSaved);
    yield takeLatest(save.toString(), handleSave);
    yield takeLatest(openFile.toString(), handleOpenFile);
    // data
    yield takeLatest(sendRequest.toString(), handleSendRequest);
}