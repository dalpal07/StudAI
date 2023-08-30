import {put} from 'redux-saga/effects';
import {setUser} from "@/slices/userSlice";
export function* handleGetUser(action) {
    try {
        yield put(setUser({...action.payload}));
    } catch (error) {
        console.log(error)
    }
}