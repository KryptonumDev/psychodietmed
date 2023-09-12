import { NextResponse } from 'next/server';
import { v4 } from 'uuid';

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
        console.log(res)
        if (response.data.status == 1) {
          p24.verifyTransaction({
            amount: response.data.amount,
            currency: response.data.currency,
            orderId: response.data.orderId,
            sessionId: response.data.sessionId,
          }).then(response => {
            if (!response) throw new Error('Verification failed')
            fetch('https://psychodietmed.headlesshub.com/graphql', {
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
          })
        } else if (response.data.status == 2) {
          fetch('https://psychodietmed.headlesshub.com/graphql', {
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