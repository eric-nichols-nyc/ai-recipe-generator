
"use server";
import { streamText } from "ai";
import { StreamableValue, createStreamableValue } from "ai/rsc"
import { openai } from "@ai-sdk/openai";

export const generateRecipe = async(ingredients:string[]): Promise<StreamableValue | any> => {
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
                  content: `Generate a recipe using the following ingredients: ${ingredients.join(', ')}`
                }
              ]
        });
        return createStreamableValue(result.textStream).value;

    } catch (err) {
        return { message: err }
    }
}import { streamText } from 'ai';

export async function generateRecipe(ingredients: string[], userId: string) {
  const response = await fetch('/api/generate-recipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients, userId }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to generate recipe');
  }

  return response.body;
}
