import MailerLite from '@mailerlite/mailerlite-nodejs';
import { NextResponse } from "next/server";

const mailerlite = new MailerLite({
  api_key: process.env.NEWSLETTER_API_KEY
});

export async function POST(request) {
  const res = await request.json();

  let data = await mailerlite.subscribers.createOrUpdate({
    status: "active",
    email: res.email,
    fields: {
      name: res.name,
    }
  })

  return NextResponse.json({ status: data.status })

}