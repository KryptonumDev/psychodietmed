import { NextResponse } from 'next/server';
import { v4 } from 'uuid';
import { P24 } from "@ingameltd/node-przelewy24";

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const session = searchParams.get('session')

    if (!id || !session) return NextResponse.redirect('https://www.psychodietmed.pl/podsumowanie?status=error')

    const transactionHeaders = new Headers();
    transactionHeaders.append("Content-Type", "application/json");
    transactionHeaders.append("Authorization", `Basic ${btoa(`${Number(process.env.P24_POS_ID)}:${process.env.P24_REST_API_KEY}`)}`);

    await fetch(`https://secure.przelewy24.pl/api/v1/transaction/by/sessionId/${session}`, {
      method: 'GET',
      headers: transactionHeaders,
    })
      .then(res => res.json())
      .then(async (res) => {
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

        const response = await p24.verifyTransaction({
          amount: res.data.amount,
          currency: res.data.currency,
          orderId: res.data.orderId,
          sessionId: res.data.sessionId,
        })
        if (!response) throw new Error('Verification failed')

        if (response) {
          await fetch('https://psychodietmed.headlesshub.com/graphql', {
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
            .then(result => result.json())
            .then(result => {
              console.log(result)
              if (result.data?.updateOrder?.clientMutationId)
                throw new Error('complete')
              else
                throw new Error('error')
            })
        }
        } else if (res.data.status == 2) {
          await fetch('https://psychodietmed.headlesshub.com/graphql', {
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
            .then(result => result.json())
            .then(result => {
              console.log(result)
              if (result.data?.updateOrder?.clientMutationId)
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
      return NextResponse.redirect('https://www.psychodietmed.pl/podsumowanie?status=error')
  }
}