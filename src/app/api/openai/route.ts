import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { system_prompt } from './prompts';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const modeTemperatures: Record<string, number> = {
      'Creative mode': 0.9,
      'Balanced mode': 0.6,
      'Strict mode': 0.2,
    };

    // Default to 0.6 if mode not found
    const temperature = modeTemperatures[mode] ?? 0.6;

    console.log('Mode:', mode, 'Temperature:', temperature);
    console.log('Selected Model:', model);

    // Map messages to OpenAI's expected format
    const openaiMessages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: system_prompt,
      },
      ...messages.map((msg): ChatCompletionMessageParam => ({
        role: msg.sender === 'ai' ? 'assistant' : 'user',
        content: msg.content,
      })),
    ];

    // Call the OpenAI API with correctly typed messages
    const response = await openai.chat.completions.create({
      model: model,
      messages: openaiMessages,
      temperature,
      max_tokens: 4095,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const aiResponse = response.choices[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json(
        { error: 'No response from OpenAI' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: aiResponse });
  } catch (error: unknown) {
    console.error('Error communicating with OpenAI:', error);
    return NextResponse.json(
      { error: 'Error communicating with OpenAI' },
      { status: 500 }
    );
  }
}