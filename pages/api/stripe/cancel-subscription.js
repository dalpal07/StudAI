import Stripe from "stripe";
import {kv} from "@vercel/kv";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
            const {id} = req.body;
            const user = await kv.get(id);
            if (!user) {
                throw new Error("User not found");
            }
            const subscriptionId = user.subscriptionId;
            if (!subscriptionId) {
                throw new Error("Subscription not found");
            }
            await stripe.subscriptions.update(
                subscriptionId,
                {cancel_at_period_end: true},
                (error, updatedSubscription) => {
                    if (error) {
                        throw new Error(error);
                    } else {
                        console.log('Subscription Canceled:', updatedSubscription);
                    }
                }
            );
            res.status(200).json({status: "success"});
        } catch (error) {
            console.log("error", error);
            res.status(500).json({error: error});
        }
    } else {
        res.status(405).json({error: "method not allowed"});
    }
}