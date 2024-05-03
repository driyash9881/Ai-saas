import { auth } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse  } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userId } = auth();
        const body = await req.();
        const { messages  } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API Key not configured.", { status: 500 });
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        });

        return NextResponse.json(response.choices[0].message);
    }   catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

//EXACT Copy 