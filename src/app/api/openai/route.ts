import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { system_prompt } from './prompts'; // Import the system prompt

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: system_prompt, 
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.31,
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
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    return NextResponse.json(
      { error: 'Error communicating with OpenAI' },
      { status: 500 }
    );
  }
}