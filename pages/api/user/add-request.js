import {kv} from "@vercel/kv";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const {id} = req.query;
            const user = await kv.get(id);
            if (!user || !user.subscriptions || user.subscriptions.length === 0) {
                res.status(500).json({error: "Internal Server Error"});
            }
            const subscriptions = user.subscriptions
            const mostRecentSubscription = subscriptions.reduce((prev, curr) =>
                curr.date > prev.date ? curr : prev
            );
            mostRecentSubscription.requests += 1;
            await kv.set(id, JSON.stringify(user));
            res.status(200).json({status: "success", requests: mostRecentSubscription.requests});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
}