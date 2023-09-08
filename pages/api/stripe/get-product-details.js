import Stripe from "stripe";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
            const {productId} = req.body;
            const product = await stripe.products.retrieve(productId);
            res.status(200).json({product: product});
        } catch (error) {
            console.log("error", error);
            res.status(500).json({error: error});
        }
    } else {
        res.status(405).json({error: "method not allowed"});
    }
}