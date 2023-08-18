import {kv} from "@vercel/kv";

export default async function handler(req, res) {
    const value = JSON.stringify({
        subscriptions: [
            {
                type: "owner",
                date: new Date().toISOString(),
                requests: 0,
            }
        ]
    })
    const owners = process.env.OWNERS.split(",")
    for (const owner of owners) {
        await kv.set(owner, value)
    }
    res.status(200).json({status: "success"});
}