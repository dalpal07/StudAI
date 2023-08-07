import { OpenAIChatStream, OpenAIChatStreamPayload } from "../../utils/OpenAIChatStream";

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
    if (messages === undefined || messages.length === 0) {
        console.log("No prompt in the request");
        return new Response("No prompt in the request", { status: 400 });
    }

    const payload: OpenAIChatStreamPayload = {
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: true,
        stop: "[DONE]",
    };
    const stream = await OpenAIChatStream(payload);
    return new Response(stream);
};

export default handler;
