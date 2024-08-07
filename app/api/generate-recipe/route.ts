import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';
import { getRateLimitCount, incrementRateLimitCount } from '@/lib/redis';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse('Missing OpenAI API Key.', { status: 400 });
    }

    const { ingredients, userId } = await req.json();
    if (!ingredients || !userId) {
      return new NextResponse('Ingredients and userId are required.', { status: 400 });
    }

    const rateLimitCount = await getRateLimitCount(userId);
    if (rateLimitCount >= 5) {
      return new NextResponse('Rate limit exceeded. Try again tomorrow.', { status: 429 });
    }

    await incrementRateLimitCount(userId);

    const response = await streamText({
      model: openai('gpt-3.5-turbo'),
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates recipes based on given ingredients.'
        },
        {
          role: 'user',
          content: `Generate a recipe using the following ingredients: ${ingredients.join(', ')}`
        }
      ]
    });

    return response.toDataStreamResponse();

  } catch (error: any) {
    return new NextResponse(error.message || 'Something went wrong!', {
      status: 500
    });
  }
}
