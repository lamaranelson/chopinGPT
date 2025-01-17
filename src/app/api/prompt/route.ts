import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient();

interface PromptRequest {
  prompt: string;
}

export async function POST(request: Request) {
  try {
    const { prompt }: PromptRequest = (await request.json()) as PromptRequest; 

    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const latestPrompt = await prisma.prompt.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (latestPrompt) {
      await prisma.prompt.update({
        where: { id: latestPrompt.id },
        data: { prompt },
      });
    } else {
      await prisma.prompt.create({
        data: { prompt },
      });
    }

    return new Response(JSON.stringify({ message: 'Prompt upserted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error upserting prompt:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET(_request: Request) {
  try {
    const promptRecord = await prisma.prompt.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (promptRecord) {
      return new Response(JSON.stringify({ prompt: promptRecord.prompt }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ prompt: '' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error: unknown) {
    console.error('Error fetching prompt:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}