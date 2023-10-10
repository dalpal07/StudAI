import '@/styles/globals.css'
// pages/_app.js
import store from "@/store";
import {Provider} from "react-redux";
import {UserProvider} from '@auth0/nextjs-auth0/client';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

export default function App({ Component, pageProps }) {
    const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    // Track page views on route change
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