import { OpenAIScriptStream, OpenAIScriptStreamPayload } from "../../utils/OpenAIScriptStream";


if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
}

export const config = {
    runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {

    const { reqString } = (await req.json()) as {
        reqString?: string;
    };
    if (!reqString) {
        console.log("No prompt in the request")
        return new Response("No prompt in the request", { status: 400 });
    }

    const payload: OpenAIScriptStreamPayload = {
        model: "text-davinci-003",
        prompt: reqString,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
    };
    const stream = await OpenAIScriptStream(payload);
    return new Response(stream)
};

export default handler;