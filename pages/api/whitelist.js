function isWhiteListed(user) {
    const whiteListString = process.env.WHITELIST
    const whiteList = whiteListString.split(',')
    return whiteList.includes(user.email)
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = JSON.parse(req.body);
            if (isWhiteListed(user)) {
                console.log("User is whitelisted: " + user.email)
                res.status(200).json({ isWhiteListed: true });
            }
            else {
                console.log("User is NOT whitelisted: " + user.email)
                res.status(200).json({ isWhiteListed: false });
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ error: err.toString(), stack: err.stack});
        }
    }
}