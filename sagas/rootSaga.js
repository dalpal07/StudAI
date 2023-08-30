import {takeLatest} from 'redux-saga/effects';
import {getUser} from "@/slices/userSlice";
import {getSubscription} from "@/slices/subscriptionSlice";
import {handleGetUser} from "@/sagas/handlers/user";
import {handleGetSubscription} from "@/sagas/handlers/subscription";

export function* watcherSaga() {
    yield takeLatest(getUser.toString(), handleGetUser);
    yield takeLatest(getSubscription.toString(), handleGetSubscription);
}