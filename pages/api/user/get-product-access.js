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
                res.status(200).json({access: false});
            }
            if (user.subscriptions.length === 0) {
                res.status(200).json({access: false});
            } else {
                const subscriptions = user.subscriptions
                const mostRecentSubscription = subscriptions.reduce((prev, curr) =>
                    curr.date > prev.date ? curr : prev
                );
                const requests = mostRecentSubscription.requests;
                const type = mostRecentSubscription.type;
                let date = mostRecentSubscription.date;
                if (date) {
                    date = new Date(date);
                    const now = new Date();
                    const daysDifference = Math.floor((now - date) / (1000 * 60 * 60 * 24));
                    if (daysDifference > 31 && type !== "free" && type !== "owner") {
                        res.status(200).json({access: false});
                    }
                }
                if (type === "free" && requests >= 50 || type === "standard" && requests >= 250) {
                    res.status(200).json({access: false});
                }
                res.status(200).json({access: true, type: type, requests: requests});
            }
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
}