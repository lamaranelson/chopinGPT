import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Use a type assertion to ensure the result of request.json() is typed
    const requestBody = await request.json() as { text: string };
    const { text } = requestBody;
    
    const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY!;
    const voiceId = 'JBFqnCBsd6RMkjVDRZzb'; 

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        Accept: 'audio/mpeg',
        'xi-api-key': elevenLabsApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new NextResponse(`Error in ElevenLabs API call: ${errorText}`, { status: 500 });
    }

    const audioData = await response.arrayBuffer();

    return new NextResponse(audioData, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error('Error in TTS route:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}