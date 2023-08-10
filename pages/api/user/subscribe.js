import { kv } from "@vercel/kv";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const {id} = req.query;
            const {type, transactionId} = req.body;
            let user = await kv.get(id);
            if (!user || !user.subscriptions) {
                const obj = {
                    subscriptions: []
                }
                await kv.set(id, JSON.stringify(obj));
                user = await kv.get(id);
            }
            const subscriptions = user.subscriptions
            if (type === "standard" || type === "unlimited") {
                subscriptions.push({
                    type: type,
                    transactionId: transactionId,
                    date: new Date().toISOString(),
                    requests: 0,
                })
            }
            else if (type === "free") {
                for (const subscription of subscriptions) {
                    if (subscription.type === "free") {
                        res.status(200).json({status: "success"});
                        return;
                    }
                }
                subscriptions.push({
                    type: type,
                    date: new Date().toISOString(),
                    requests: 0,
                })
            }
            await kv.set(id, JSON.stringify(user));
            res.status(200).json({status: "success"});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
}