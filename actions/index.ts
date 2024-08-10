
"use server";
import { streamText } from "ai";
import { StreamableValue, createStreamableValue } from "ai/rsc"
import { openai } from "@ai-sdk/openai";
import { getRateLimitCount, incrementRateLimitCount } from '@/lib/redis';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { headers } from 'next/headers';

const rateLimit = new Ratelimit({
  redis: new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  }),
  limiter: Ratelimit.slidingWindow(4, "600 s"),
});

const ip = headers().get('x-forwarded-for');

export const getRateLimit = async (): Promise<number | any> => {
  const { remaining, limit, success } = await rateLimit.limit(ip!);

  if (remaining === 0) {
    throw new Error("You have reached your requests limit.");
  }

  return remaining;
}

export const generateRecipe = async (ingredients: string[]): Promise<StreamableValue | any> => {
  // check rate limit of user on each request

  try {
    const result = await streamText({
      model: openai("gpt-4o"),
      temperature: 0.5,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates recipes based on given ingredients.'
        },
        {
          role: 'user',
          content: `Generate a recipe based on the following list of ingredients ${ingredients.join(', ')}. The recipe should include a title, a list of ingredients, and no more than seven step-by-step instructions that are one sentence long each. The recipe should be in the format of a markdown list with each step numbered and formatted as follows:

          Recipe:
          Title: [Recipe Title]
          Ingredients:
          - [List of ingredients]
          
          Instructions:
          1. [Step 1]
          2. [Step 2]
          3. [Step 3]
          ...`
        }
      ]
    });
    return createStreamableValue(result.textStream).value;

  } catch (err) {
    return { message: err }
  }
}

