export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let link = "https://buy.stripe.com/"
            const {type} = req.body;
            if (type === "standard") {
                link += process.env.STRIPE_STANDARD_PRICE_ID;
            } else if (type === "unlimited") {
                link += process.env.STRIPE_UNLIMITED_PRICE_ID;
            }
            res.status(200).json({link: link});
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}