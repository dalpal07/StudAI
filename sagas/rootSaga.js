import {takeLatest, takeEvery} from 'redux-saga/effects';
import {getUser} from "@/slices/userSlice";
import {getSubscription} from "@/slices/subscriptionSlice";
import {handleGetUser} from "@/sagas/handlers/user";
import {handleGetSubscription} from "@/sagas/handlers/subscription";
import {
    handleDeleteFile,
    handleDownload,
    handleGetSaved,
    handleOpenFile, handleRenameFile,
    handleSave,
} from "@/sagas/handlers/file";
import {deleteFile, downloadFile, getSaved, openFile, renameFile, save, uploadFile} from "@/slices/fileSlice";
import {sendRequest} from "@/slices/dataSlice";
import {handleSendRequest} from "@/sagas/handlers/data";

export function* watcherSaga() {
    // user
    yield takeLatest(getUser.toString(), handleGetUser);
    // subscription
    yield takeLatest(getSubscription.toString(), handleGetSubscription);
    // file
    yield takeLatest(getSaved.toString(), handleGetSaved);
    yield takeEvery(save.toString(), handleSave);
    yield takeLatest(openFile.toString(), handleOpenFile);
    yield takeLatest(downloadFile.toString(), handleDownload);
    yield takeLatest(deleteFile.toString(), handleDeleteFile);
    yield takeLatest(renameFile.toString(), handleRenameFile);
    // data
    yield takeLatest(sendRequest.toString(), handleSendRequest);
}