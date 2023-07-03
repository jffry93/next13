import { NextResponse } from 'next/server';

// search for movies by title using the movie db api
export async function GET(req: Request) {
  try {
    const url = process.env.PYTHON_AI + `/api/sentiment-analysis`;

    const data = { text: 'Fucking awesome' };
    console.log(process.env.PYTHON_AI_API_KEY);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.PYTHON_AI_API_KEY || '', // used to authenticate the request
      },
      body: JSON.stringify(data),
    });

    const json = await res.text();

    return NextResponse.json(json);
  } catch (error) {
    console.log(error);
  }
}
