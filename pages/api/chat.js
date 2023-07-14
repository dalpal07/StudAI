export default async function handler(req, res) {
    if (req.method === 'POST') {
        const prompt = req.body

        console.log("Prompt: " + prompt)

        const { Configuration, OpenAIApi } = require("openai");

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 1,
                max_tokens: 1,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            })
            res.status(200).json({response: response.data.choices[0].text});
        } catch (e) {
            console.log("Error: " + e)
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
