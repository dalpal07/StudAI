import {call, put} from 'redux-saga/effects';
import {setStripeSubscription, setSubscription, updateCancelAtEnd} from "@/slices/subscriptionSlice";
import {
    requestCancelSubscription,
    requestGetProductDetails,
    requestGetStripeSubscription,
    requestGetSubscription,
} from "@/sagas/requests/subscription";

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

export function* handleGetStripeSubscription(action) {
    try {
        if (action.payload.id === null) {
            yield put(setStripeSubscription({subscription: null}));
            return;
        }
        const response = yield call(requestGetStripeSubscription, action.payload.id);
        const {data} = response;
        const requests = data.requests;
        const proudctResponse = yield call(requestGetProductDetails, data.subscription.plan.product);
        const {data: productData} = proudctResponse;
        const type = productData.product.name;
        const endDate = data.subscription.current_period_end * 1000
        const cancelAtEnd = data.subscription.cancel_at_period_end;
        yield put(setSubscription({type: type, date: endDate, cancel_at_end: cancelAtEnd, requests: requests}));
    } catch (error) {
        console.log(error)
    }
}

export function* handleCancelSubscription(action) {
    try {
        const response = yield call(requestCancelSubscription, action.payload.id);
        if (response.status === 200) {
            yield put(updateCancelAtEnd({cancel_at_end: true}));
        }
    } catch (error) {
        console.log(error)
    }
}