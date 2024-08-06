import OpenAI from 'openai'
import { NextResponse } from 'next/server'

export const runtime = 'edge'
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' })

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse('Missing OpenAI API Key.', { status: 400 })
    }

    const { prompt } = await req.json()
    const response = await openai.images.generate({
      model: "dall-e-3",
        prompt,
        n: 1,
        size: "1024x1024",
      });
      const imageUrl = response.data[0].url;
      console.log('url = ',imageUrl);
      if(imageUrl === undefined){
      return NextResponse.json({ message: 'Image not found' }, { status: 404 });
    }else{
      return NextResponse.json({ imageUrl }, { status: 200 });
    }

  } catch (error: any) {
    return new NextResponse(error.message || 'Something went wrong!', {
      status: 500
    })
  }
}
