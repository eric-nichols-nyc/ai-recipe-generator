import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse('Missing OpenAI API Key.', { status: 400 });
    }

    const { ingredients } = await req.json();
    if (!ingredients) {
      return new NextResponse('Ingredients are required.', { status: 400 });
    }

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
