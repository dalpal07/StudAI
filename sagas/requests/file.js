import axios from "axios";

export function* requestGetSaved(id) {
    return yield axios.post(`/api/user/files/get-file-names`, {id: id});
}

export function* requestSave(payload) {
    return yield axios.post(`/api/user/files/save-file-content`, payload);
}

export function* requestGetFile(fileName, id) {
    return yield axios.post(`/api/user/files/get-file-content`, {fileName: fileName, id: id});
}

export function* requestDeleteFile(fileName, id) {
    return yield axios.post(`/api/user/files/delete-file`, {fileName: fileName, id: id});
}

export function* requestRenameFile(payload) {
    return yield axios.post(`/api/user/files/rename-file`, payload);
}