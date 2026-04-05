import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': process.env.MAILERLITE_APIKEY,
    };
    let requestBody = await req.json();

    const response = await fetch(`https://api.mailerlite.com/api/v2/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
      cache: 'no-cache',
    });
    console.log(response);
    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ response: response.json(), success: true });
    }
  } catch(err) {
    console.log(err);
    return NextResponse.json({ error: err, success: false }, { status: 500 });
  }
}