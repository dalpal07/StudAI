export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = JSON.parse(req.body);
        const instruction = body.instruction;
        const input = body.content;
        const fileName = body.name
        const fileExt = body.ext;
        const newFileName = `${fileName}_${Date.now()}.${fileExt}`;
        const { Configuration, OpenAIApi } = require("openai");
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        const openai = new OpenAIApi(configuration);

        const response = await openai.createEdit({
            model: "text-davinci-edit-001",
            input: input,
            instruction: instruction,
            temperature: 0.2,
            top_p: 1,
        });
        res.status(200).json({fileName: newFileName, content: response.data.choices[0].text});
    } else {
        res.status(405).send('Method Not Allowed');
    }
};