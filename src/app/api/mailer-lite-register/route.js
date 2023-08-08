import fetch from "node-fetch"
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer d62f6707ee0a30f6d6707545783baaed`
    };
    const requestBody = await req.json();

    const response = await fetch(`https://connect.mailerlite.com/api/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });
    console.log(response);
    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch(err) {
    console.log(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}