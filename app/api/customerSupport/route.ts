import { rateLimit } from '@/utils/ratelimiter';
import { NextResponse } from 'next/server';

// search for movies by title using the movie db api
export async function GET(req: Request) {
  try {
    const { success } = await rateLimit.limit('global-rate-limit-key');

    if (!success) {
      return NextResponse.json({
        status: 429,
        message: 'Too many requests',
      });
    }

    const url = process.env.PYTHON_AI + `/api`;

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.PYTHON_AI_API_KEY || '', // used to authenticate the request
      },
    });

    const json = await res.json();

    return NextResponse.json({
      data: json,
      status: { code: 200, message: 'Successful response' },
    });
  } catch (error) {
    console.log(error);
  }
}

// search for movies by title using the movie db api
export async function POST(req: Request) {
  try {
    const { success } = await rateLimit.limit('global-rate-limit-key');

    if (!success) {
      return NextResponse.json({
        status: 429,
        message: 'Too many requests',
      });
    }

    const body = await req.json();

    const url = process.env.PYTHON_AI + `/api/sentiment-analysis`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.PYTHON_AI_API_KEY || '', // used to authenticate the request
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();

    return NextResponse.json({ data: json });
  } catch (error) {
    console.log(error);
  }
}
