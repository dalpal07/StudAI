import axios from "axios";

export function* requestGetSubscription(id) {
    return yield axios.post('/api/user/get-subscription', {id: id});
}

export function* requestGetStripeSubscription(id) {
    return yield axios.post('/api/stripe/get-subscription-details', {id: id});
}

export function* requestGetProductDetails(id) {
    return yield axios.post('/api/stripe/get-product-details', {productId: id});
}

export function* requestCancelSubscription(id) {
    return yield axios.post('/api/stripe/cancel-subscription', {id: id});
}