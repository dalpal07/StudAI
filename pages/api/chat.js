export default async function handler(req, res) {
    let prompt = "You are an AI chatbot named Stud. Your goal is to chat with users about their data requests until you sufficiently understand the details of what they're asking. Be sure to get the exact table name(s) and appropriate header, column, or row names/indexes as well. When you sufficiently understand, simply tell the user that you will take care of the request. DO NOT explain how you will carry out the request.\n\nRespond to this conversation:\n"
    if (req.method === 'POST') {
        const body = JSON.parse(req.body);
        console.log("Prompt: " + prompt)
        console.log("Body: " + body)
        body.forEach((line) => {
            if (line.type === "user") {
                prompt += "\nUser: " + line.message
            } else {
                prompt += "\nStud: " + line.message
            }
        })
        prompt += "\nStud: [insert]"
        console.log("Prompt: " + prompt)

        const { Configuration, OpenAIApi } = require("openai");

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

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
        res.status(200).json({response: response.data.choices[0].text});
    } else {
        res.status(405).send('Method Not Allowed');
    }
}
