import fetch from "node-fetch"
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': process.env.MAILERLITE_APIKEY,
    };
    let requestBody = await req.json();

    requestBody = { status: 'active', fields: { marketing_permissions: 1 }, ...requestBody }

    const response = await fetch(`https://api.mailerlite.com/api/v2/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}