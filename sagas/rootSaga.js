import {takeLatest} from 'redux-saga/effects';
import {getUser} from "@/slices/userSlice";
import {getSubscription} from "@/slices/subscriptionSlice";
import {handleGetUser} from "@/sagas/handlers/user";
import {handleGetSubscription} from "@/sagas/handlers/subscription";
import {handleDownload, handleGetSaved, handleOpenFile, handleSave} from "@/sagas/handlers/file";
import {downloadFile, getSaved, openFile, save} from "@/slices/fileSlice";
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
    yield takeLatest(downloadFile.toString(), handleDownload);
    // data
    yield takeLatest(sendRequest.toString(), handleSendRequest);
}