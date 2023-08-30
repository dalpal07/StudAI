import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/slices/userSlice";
import subscriptionReducer from "@/slices/subscriptionSlice";
import fileReducer from "@/slices/fileSlice";
import dataReducer from "@/slices/dataSlice";
import createSagaMiddleware from "redux-saga";
import {watcherSaga} from "@/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        user: userReducer,
        subscription: subscriptionReducer,
        file: fileReducer,
        data: dataReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
});
sagaMiddleware.run(watcherSaga);
export default store;