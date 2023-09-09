import '@/styles/globals.css'
// pages/_app.js
import React, {useEffect} from 'react';
import store from "@/store";
import {Provider} from "react-redux";
import {UserProvider} from '@auth0/nextjs-auth0/client';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import ReactGA from 'react-ga';
import * as gaConfig from '@/public/GoogleAnalytics';
import {useRouter} from "next/router";

export default function App({ Component, pageProps }) {
    const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    const router = useRouter();
    // Initialize Google Analytics
    useEffect(() => {
        ReactGA.initialize(gaConfig.GA_TRACKING_ID);
    }, []);
    // Track page views on route change
    useEffect(() => {
        const handleRouteChange = (url) => {
            gaConfig.pageview(url);
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);
    return (
        <Provider store={store}>
            <UserProvider>
                <Elements stripe={stripe}>
                    <Component {...pageProps} />
                </Elements>
            </UserProvider>
        </Provider>
    );
}