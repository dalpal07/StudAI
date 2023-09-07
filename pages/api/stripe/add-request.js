import {kv} from "@vercel/kv";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
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
                throw new Error("No subscription id");
            }
            let studSubscription = await kv.get(subscriptionId);
            if (!studSubscription) {
                throw new Error("No Stud subscription");
            }
            studSubscription = {
                ...studSubscription,
                requests: studSubscription.requests + 1,
            }
            await kv.set(subscriptionId, JSON.stringify(studSubscription));
            const upToDateStudSubscription = await kv.get(subscriptionId);
            res.status(200).json({requests: upToDateStudSubscription.requests});
        } catch (error) {
            console.log("error", error);
            res.status(500).json({error: error});
        }
    } else {
        res.status(405).json({error: "method not allowed"});
    }
}