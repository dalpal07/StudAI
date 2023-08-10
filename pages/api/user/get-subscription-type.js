import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const {id} = req.query;
            const user = await kv.get(id);
            if (!user || !user.subscriptions) {
                const obj = {
                    subscriptions: []
                }
                await kv.set(id, JSON.stringify(obj));
                res.status(200).json({type: "none"});
            }
            if (user.subscriptions.length === 0) {
                res.status(200).json({type: "none"});
            } else {
                const subscriptions = user.subscriptions
                const mostRecentSubscription = subscriptions.reduce((prev, curr) =>
                    curr.date > prev.date ? curr : prev
                );
                if (mostRecentSubscription.date) {
                    const date = new Date(mostRecentSubscription.date);
                    const now = new Date();
                    const daysDifference = Math.floor((now - date) / (1000 * 60 * 60 * 24));
                    if (daysDifference > 31 && mostRecentSubscription.type !== "free" && mostRecentSubscription.type !== "owner") {
                        res.status(200).json({type: "none"});
                    }
                }
                res.status(200).json({type: mostRecentSubscription.type});
            }
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
}