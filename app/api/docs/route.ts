import { NextResponse } from 'next/server';

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Not Found', { status: 404 });
  }

  return NextResponse.redirect('https://petstore.swagger.io/?url=http://localhost:3000/api/docs/json');
}
