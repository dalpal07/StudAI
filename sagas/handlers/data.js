import axios from "axios";

export function* requestGetScript(data) {
    return yield axios.post('api/script', data);
}

export function* requestRunScript(data) {
    return yield axios.post('api/run', data);
}