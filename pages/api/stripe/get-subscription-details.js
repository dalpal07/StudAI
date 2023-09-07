import Stripe from "stripe";
import {kv} from "@vercel/kv";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
            const {id} = req.body;
            if (!id) {
                throw new Error("User id not found");
            }
            const user = await kv.get(id);
            if (!user) {
                throw new Error("User not found");
            }
            const subscriptionId = user.subscriptionId;
            if (!subscriptionId) {
                console.log("no subscription id");
                res.status(200).json({subscription: null});
                return
            }
            const stripeSubscription = await stripe.subscriptions.retrieve(subscriptionId);
            const today = new Date().getTime() / 1000;
            if (!stripeSubscription || today > stripeSubscription.current_period_end) {
                console.log("no stripe subscription");
                res.status(200).json({subscription: null});
                return
            }
            const studSubscription = await kv.get(subscriptionId);
            if (!studSubscription) {
                const obj = {
                    current_period_start: stripeSubscription.current_period_start,
                    requests: 0,
                }
                await kv.set(subscriptionId, JSON.stringify(obj));
            }
            else {
                if (stripeSubscription.current_period_start !== studSubscription.current_period_start) {
                    const obj = {
                        current_period_start: stripeSubscription.current_period_start,
                        requests: 0,
                    }
                    await kv.set(subscriptionId, JSON.stringify(obj));
                }
            }
            const upToDateStudSubscription = await kv.get(subscriptionId);
            res.status(200).json({subscription: stripeSubscription, requests: upToDateStudSubscription.requests});
        } catch (error) {
            console.log("error", error);
            res.status(500).json({error: error});
        }
    } else {
        res.status(405).json({error: "method not allowed"});
    }
}