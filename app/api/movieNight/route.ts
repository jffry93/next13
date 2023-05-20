import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');
  if (typeof title !== 'string') {
    return;
  }

  return NextResponse.json(title);
}
