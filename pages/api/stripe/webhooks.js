import Stripe from "stripe";
import { buffer } from "micro";
import {kv} from "@vercel/kv";

export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function handler(req, res) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    if (req.method === "POST") {
        const buf = await buffer(req);
        const sig = req.headers["stripe-signature"];
        const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

        let event;
        try {
            if (!sig || !webhookSecret) {
                return;
            }
            event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
            if (event.type === "checkout.session.completed") {
                const studId = event.data.object.client_reference_id.replace("--", "|");
                const stripeId = event.data.object.customer;
                const subscriptionId = event.data.object.subscription;
                console.log(`✅ Success: ${event.type}; ${studId}`);
                let user = await kv.get(studId);
                if (!user) {
                    throw new Error("User not found");
                }
                console.log("user", user);
                user.stripeId = stripeId;
                user.subscriptionId = subscriptionId;
                await kv.set(studId, JSON.stringify(user));
            }
            res.status(200).send();
        } catch (err) {
            console.log(`❌ Error message: ${err.message}`);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
    }
}