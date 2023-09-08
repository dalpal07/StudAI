import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const {id} = req.body;
            const user = await kv.get(id);
            if (!user || !user.subscriptions) {
                const obj = {
                    subscriptions: []
                }
                await kv.set(id, JSON.stringify(obj));
                res.status(200).json({type: "none", productAccess: false});
            }
            if (user.subscriptions.length === 0) {
                res.status(200).json({type: "none", productAccess: false});
            } else {
                const subscriptions = user.subscriptions
                const mostRecentSubscription = subscriptions.reduce((prev, curr) =>
                    curr.date > prev.date ? curr : prev
                );
                const type = mostRecentSubscription.type;
                const requests = mostRecentSubscription.requests;
                const original_date = mostRecentSubscription.date;
                if (original_date) {
                    const date = new Date(original_date);
                    const now = new Date();
                    const daysDifference = Math.floor((now - date) / (1000 * 60 * 60 * 24));
                    if (daysDifference > 31 && type !== "free" && type !== "owner") {
                        res.status(200).json({type: "none", productAccess: "false"});
                    }
                }
                if (type === "free" && requests >= 50 || type === "standard" && requests >= 250) {
                    res.status(200).json({type: mostRecentSubscription.type, date: mostRecentSubscription.date, requests: mostRecentSubscription.requests, productAccess: false});
                }
                else {
                    res.status(200).json({
                        type: mostRecentSubscription.type,
                        date: mostRecentSubscription.date,
                        requests: mostRecentSubscription.requests,
                        productAccess: true
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({error: error});
        }
    }
}