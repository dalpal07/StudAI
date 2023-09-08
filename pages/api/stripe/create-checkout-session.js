import {kv} from "@vercel/kv";
import Stripe from "stripe";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let link = `https://buy.stripe.com/`
            const {type, id} = req.body;
            const user = await kv.get(id);
            if (user) {
                const subscriptionId = user.subscriptionId;
                if (subscriptionId) {
                    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
                    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
                    if (subscription && subscription.status === "active") {
                        res.status(200).json({link: "/product"});
                        return;
                    }
                }
            }
            if (type === "standard") {
                link += process.env.STRIPE_STANDARD_PRICE_ID;
            } else if (type === "unlimited") {
                link += process.env.STRIPE_UNLIMITED_PRICE_ID;
            }
            const updatedId = id.toString().replace("|", "--");
            link += `?client_reference_id=${updatedId}`
            console.log("link", link);
            res.status(200).json({link: link});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}