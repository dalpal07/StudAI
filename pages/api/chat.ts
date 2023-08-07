import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
}

export const config = {
    runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
    const { messages } = (await req.json()) as {
        messages?: Array<{ role: string; content: string }>;
    };
    console.log(messages)
    if (messages === undefined || messages.length === 0) {
        console.log("No prompt in the request");
        return new Response("No prompt in the request", { status: 400 });
    }

    const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo", // Switch to the new model
        messages: messages,
        temperature: 0,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
        stop: "[DONE]",
    };
    console.log(payload)
    const stream = await OpenAIStream(payload);
    return new Response(stream);
};

export default handler;
