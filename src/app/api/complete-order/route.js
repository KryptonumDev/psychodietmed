import { NextResponse } from 'next/server';
import { v4 } from 'uuid';
import { P24 } from "@ingameltd/node-przelewy24";

export const dynamic = 'force-dynamic'

export async function POST(req) {
  try {
    const { merchantId, posId, sessionId, amount, originAmount, currency, orderId, methodId, statement, sign } = await req.json()

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

    const order = await fetch('https://psychodietmed.headlesshub.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${process.env.AUTHORISE_USERNAME}:${process.env.AUTHORISE_PASSWORD}`)}`
      },
      body: JSON.stringify({
        query: `
          mutation UPDATE_ORDER( $input: UpdateOrderInput! ) {
            updateOrder(input: $input) {
              clientMutationId
            }
          }
        `,
        variables: {
          input: {
            clientMutationId: v4(),
            orderId: Number(id),
            status: "COMPLETED",
          },
        }
      }),
      cache: 'no-cache',
    })

    if (order.status !== 200) {
      console.log(order)
      return NextResponse.json({ res: order }, { status: 500 })
    }

    if (response.status !== 200) {
      console.log(response)
      return NextResponse.json({ res: response }, { status: 500 })
    }


    return NextResponse.json({
      res: response,
      order: order
    })
  } catch (err) {
    return NextResponse.json({ res: err }, { status: 500 })
  }
}