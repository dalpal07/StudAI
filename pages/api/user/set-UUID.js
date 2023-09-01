import {kv} from "@vercel/kv";
const uuid = require('uuid');

export default async function handler(req, res) {
    try {
        const {id} = req.body;
        const user = await kv.get(id);
        if (!user) {
            res.status(400).json({message: "User not found"});
            return;
        }
        user.uuid = uuid.v4().toString();
        await kv.set(id, JSON.stringify(user));
        res.status(200).json({uuid: user.uuid});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}