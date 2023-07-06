export default async function chat(request, response) {
    if (request.method === 'POST') {
        const prompt = request.body;

        const { Configuration, OpenAIApi } = require('openai');
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        try {
            console.log('Before request');
            const completion = await openai.complete({
                engine: 'davinci',
                prompt: prompt,
                temperature: 1,
                maxTokens: 1024,
                topP: 1,
                frequencyPenalty: 0,
                presencePenalty: 0,
            });
            const { choices } = completion.data;
            console.log('After request');
            return response.status(200).json({ response: choices[0].text });
        } catch (e) {
            console.log('Error: ' + e);
            return response.status(500).send('Internal Server Error');
        }
    } else {
        return response.status(405).send('Method Not Allowed');
    }
}
