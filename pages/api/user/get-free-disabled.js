import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const {id} = req.query;
            const user = await kv.get(id);
            if (!user || !user.subscriptions || user.subscriptions.length === 0) {
                res.status(200).json({disabled: false});
            }
            const subscriptions = user.subscriptions
            for (const subscription of subscriptions) {
                if (subscription.type === "free" && subscription.requests >= 50) {
                    res.status(200).json({disabled: true});
                }
            }
            res.status(200).json({disabled: false});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
}