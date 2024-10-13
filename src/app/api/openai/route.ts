import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  runtime: "edge",
};

const prisma = new PrismaClient();

interface Message {
  sender: 'user' | 'ai';
  content: string;
}

interface RequestBody {
  messages: Message[];
  mode: string;
  model: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, mode, model } = (await request.json()) as RequestBody;

    const promptRecord = await prisma.prompt.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const fetchedPrompt = promptRecord?.prompt ?? '';

    const modeTemperatures: Record<string, number> = {
      'Creative mode': 0.9,
      'Balanced mode': 0.6,
      'Strict mode': 0.2,
    };

    // Default to 0.6 if mode not found
    const temperature = modeTemperatures[mode] ?? 0.6;

    console.log('Mode:', mode, 'Temperature:', temperature);
    console.log('Selected Model:', model);

    const openaiMessages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: fetchedPrompt,
      },
      ...messages.map((msg): ChatCompletionMessageParam => ({
        role: msg.sender === 'ai' ? 'assistant' : 'user',
        content: msg.content,
      })),
    ];

    const response = await openai.chat.completions.create({
      model: model,
      messages: openaiMessages,
      temperature,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: true
    });

    console.log("OpenAI response received");

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error communicating with OpenAI:', error.message);
    } else {
      console.error('Error communicating with OpenAI:', error);
    }
    return NextResponse.json(
      { error: 'Error communicating with OpenAI' },
      { status: 500 }
    );
  }
}