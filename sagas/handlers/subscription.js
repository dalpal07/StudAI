import {call, put} from 'redux-saga/effects';
import {setSubscription} from "@/slices/subscriptionSlice";
import {requestGetSubscription} from "@/sagas/requests/subscription";

export function* handleGetSubscription(action) {
    try {
        if (action.payload.id === null) {
            yield put(setSubscription({type: null, date: null, requests: null}));
            return;
        }
        const response = yield call(requestGetSubscription, action.payload.id)
        const {data} = response;
        yield put(setSubscription({...data}));
    } catch (error) {
        console.log(error)
    }
}