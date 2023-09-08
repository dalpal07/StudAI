import axios from "axios";

export function* requestGetScript(data) {
    return yield axios.post('api/script', data);
}

export function* requestRunScript(data) {
    return yield axios.post('api/run', data);
}

export function* requestSetUUID(data) {
    return yield axios.post('api/user/set-UUID', data);
}

export function* requestAddRequest(id) {
    return yield axios.post('api/stripe/add-request', {id: id});
}