import '@/styles/globals.css'
// pages/_app.js
import React from 'react';
import store from "@/store";
import {Provider} from "react-redux";
import {UserProvider} from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <UserProvider>
                <Component {...pageProps} />
            </UserProvider>
        </Provider>
    );
}