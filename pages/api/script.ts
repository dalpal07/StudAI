import { OpenAIScriptStream, OpenAIScriptStreamPayload } from "../../utils/OpenAIScriptStream";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
}

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

export const config = {
    runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
    const { headers, request } = (await req.json()) as {
        headers?: [];
        request?: string;
    };
    if (!headers || headers.length === 0 || !request) {
        console.log("Headers or request not provided")
        return new Response("Bad request", { status: 400 });
    }
    const systemContent = getSystemContent(headers);
    const payload: OpenAIScriptStreamPayload = {
        model: "gpt-3.5-turbo",
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
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: "[DONE]",
        stream: true,
    };
    const stream = await OpenAIScriptStream(payload);
    return new Response(stream)
};

export default handler;