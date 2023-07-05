export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body);
        const conversation = body.conversation;
        let prompt = body.prompt;
        prompt += "\n\nRespond to this conversation:\n"
        conversation.forEach((line) => {
            if (line.type === "user") {
                prompt += "\nUser: " + line.message
            } else {
                prompt += "\nStud: " + line.message
            }
        })
        prompt += "\nStud: [insert]"

        const { Configuration, OpenAIApi } = require("openai");

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);
        console.log("Prompt: " + prompt)
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                suffix: "",
                temperature: 1,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            })
            console.log("Response: " + response.data.choices[0].text)
            res.status(200).json({response: response.data.choices[0].text});
        } catch (e) {
            console.log("Error: " + e)
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
