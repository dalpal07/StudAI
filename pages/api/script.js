const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function getSystemContent(headers) {
    let systemContent = "You are a data assistant named Stud. Your job is to write a javascript function that takes an array of headers and a " +
        "double array of entries and returns an object {headers: newHeaders, entries: newEntries} with manipulations " +
        "or filtering performed based on the user's request. " +
        "Do not describe the function and do not include comments in the code. Simply return the function alone in the following format: function performRequest(headers, entries) { // your code here }\n\n" +
        "Here is the list of headers that will be passed into the function: "
    for (let i = 0; i < headers.length; i++) {
        systemContent += headers[i]
        if (i !== headers.length - 1) {
           systemContent += ", "
        }
    }
    return systemContent
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        const {headers, request} = req.body
        const systemContent = getSystemContent(headers);
        try {
            const response = await openai.createChatCompletion({
                model: "gpt-4",
                messages: [
                    {
                        "role": "system",
                        "content": systemContent
                    },
                    {
                        "role": "user",
                        "content": request
                    }
                ],
                temperature: 0,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            if (response.status === 200) {
                res.status(200).json({script: response.data.choices[0].message.content})
            }
            else {
                res.status(500).json({error: "An error occurred while processing your request."})
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({error: e})
        }
    }
}