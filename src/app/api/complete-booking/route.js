import { NextResponse } from "next/server"
import { P24 } from "@ingameltd/node-przelewy24";

export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const { merchantId, posId, sessionId, originAmount, currency, orderId, methodId, statement, sign } = await req.json()
    const { searchParams } = new URL(req.url)
    const amount = searchParams.get('amount')
    const bookingId = searchParams.get('id')

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("X-Requested-With", "XMLHttpRequest");
    headers.append("X-Tenant", process.env.CALENDESK_TENANT_NAME);
    headers.append("X-Api-Key", process.env.CALENDESK_API_KEY);

    var body = JSON.stringify({
      "payment_method": "other",
      "booking_id": bookingId,
      "amount": amount,
      "status": "approved",
      "is_paid": true,
    });

    const p24 = new P24(
      Number(process.env.P24_MERCHANT_ID),
      Number(process.env.P24_POS_ID),
      process.env.P24_REST_API_KEY,
      process.env.P24_CRC,
      {
        sandbox: false
      }
    )

    const response = await p24.verifyTransaction({
      amount: amount,
      currency: currency,
      orderId: orderId,
      sessionId: sessionId,
    })
    if (!response) throw new Error('Verification failed')

    const booking = await fetch(`https://api.calendesk.com/api/admin/payments/bookings`, {
      method: 'POST',
      headers: headers,
      body: body,
      redirect: 'follow',
      cache: 'no-cache'
    })

    if (booking.status !== 200) {
      console.log(booking)
      return NextResponse.json({ res: booking }, { status: 500 })
    }

    if (response.status !== 200) {
      console.log(response)
      return NextResponse.json({ res: response }, { status: 500 })
    }

    console.log({ res: response, booking: booking })
    return NextResponse.json({
      res: response,
      booking: booking
    })


  } catch (err) {
    console.log(err)
    return NextResponse.json({ res: err }, { status: 500 })
  }
}