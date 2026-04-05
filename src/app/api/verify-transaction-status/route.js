import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const session = searchParams.get('session')
  try {
    const transactionHeaders = new Headers();
    transactionHeaders.append("Content-Type", "application/json");
    transactionHeaders.append("Authorization", `Basic ${btoa(`${Number(process.env.P24_POS_ID)}:${process.env.P24_REST_API_KEY}`)}`);

    await fetch(`https://secure.przelewy24.pl/api/v1/transaction/by/sessionId/${session}`, {
      method: 'GET',
      headers: transactionHeaders,
    })
      .then(response => response.json())
      .then(async (response) => {
        if (response.data.status == 1 || response.data.status == 2) {
          throw new Error('complete')
        } else {
          throw new Error('failed')
        }
      })
  } catch (err) {
    console.log(err)
    if (err.message === 'complete')
      return NextResponse.redirect('https://www.psychodietmed.pl/podsumowanie?status=success')
    else if (err.message === 'failed')
      return NextResponse.redirect(`https://www.psychodietmed.pl/podsumowanie?status=failed&session=${session}`)
    else
      return NextResponse.redirect(`https://www.psychodietmed.pl/podsumowanie?status=error&error=${err.message}`)
  }
}