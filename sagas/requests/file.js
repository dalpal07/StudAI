import axios from "axios";

export function* requestGetSaved(id) {
    return yield axios.post(`/api/user/files/get-file-names`, {id: id});
}

export function* requestSave(payload) {
    return yield axios.post(`/api/user/files/save-file-content`, payload);
}