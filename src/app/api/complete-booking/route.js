import { NextResponse } from "next/server"
import { P24 } from "@ingameltd/node-przelewy24";

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)

    const bookingId = searchParams.get('id')
    const amount = searchParams.get('amount')
    const session = searchParams.get('session')

    if (!bookingId || !session || !amount) return NextResponse.redirect(`https://www.psychodietmed.pl/podsumowanie?status=error&bookingId=${bookingId}&session=${session}&amount=${amount}`)

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

    const transactionHeaders = new Headers();
    transactionHeaders.append("Content-Type", "application/json");
    transactionHeaders.append("Authorization", `Basic ${btoa(`${Number(process.env.P24_POS_ID)}:${process.env.P24_REST_API_KEY}`)}`);

    await fetch(`https://secure.przelewy24.pl/api/v1/transaction/by/sessionId/${session}`, {
      method: 'GET',
      headers: transactionHeaders,
    })
      .then(res => res.json())
      .then(async (res) => {
        console.log(res)
        if (res.data.status == 1) {

          const p24 = new P24(
            Number(process.env.P24_MERCHANT_ID),
            Number(process.env.P24_POS_ID),
            process.env.P24_REST_API_KEY,
            process.env.P24_CRC,
            {
              sandbox: false
            }
          )

          p24.verifyTransaction({
            amount: res.data.amount,
            currency: res.data.currency,
            orderId: res.data.orderId,
            sessionId: res.data.sessionId,
          }).then(async response => {
            if (!response) throw new Error('Verification failed')
            await fetch(`https://api.calendesk.com/api/admin/payments/bookings`, {
              method: 'POST',
              headers: headers,
              body: body,
              redirect: 'follow',
              cache: 'no-cache'
            })
              .then(data => data.json())
              .then(data => {
                console.log(data)

                if (data.id && data.status === 'paid')
                  throw new Error('complete')
                else
                  throw new Error('error')
              })
          })
        } else if (res.data.status == 2) {
          await fetch(`https://api.calendesk.com/api/admin/payments/bookings`, {
            method: 'POST',
            headers: headers,
            body: body,
            redirect: 'follow',
            cache: 'no-cache'
          })
            .then(data => data.json())
            .then(data => {
              console.log(data)

              if (data.id && data.status === 'paid')
                throw new Error('complete')
              else
                throw new Error('error')
            })
        } else {
          throw new Error('failed')
        }
      })
  } catch (err) {
    console.log(err)
    if (err.message === 'complete')
      return NextResponse.redirect('https://www.psychodietmed.pl/podsumowanie?status=success')
    else if (err.message === 'failed')
      return NextResponse.redirect('https://www.psychodietmed.pl/podsumowanie?status=failed')
    else
      return NextResponse.redirect(`https://www.psychodietmed.pl/podsumowanie?status=error&error=${err.message}`)
  }
}