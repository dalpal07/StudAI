import axios from "axios";

export function* requestGetSubscription(id) {
    return yield axios.post('/api/user/get-subscription', {id: id});
}