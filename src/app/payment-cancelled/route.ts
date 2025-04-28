import { NextResponse } from 'next/server';


export const GET = (request: Request) => {
    const { searchParams } = new URL(request.url);

    const callbackUrl = searchParams.get('callback_url') ?? '/';
  
    return NextResponse.redirect(new URL(callbackUrl, process.env.NEXT_PUBLIC_APP_URL));
}