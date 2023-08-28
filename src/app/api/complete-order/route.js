import { NextResponse } from 'next/server';
import { v4 } from 'uuid';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const session = searchParams.get('session')

    if (!id || !session) return NextResponse.redirect('https://psychodietmed-git-develop-kryptonum.vercel.app/podsumowanie?status=error')

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
        if (res.data.status < 1 || res.data.status > 2)
          throw new Error('failed')

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
      })
  } catch (err) {
    console.log(err)
    if (err.message === 'complete')
      return NextResponse.redirect('https://psychodietmed-git-develop-kryptonum.vercel.app/podsumowanie?status=success')
    else if (err.message === 'failed')
      return NextResponse.redirect('https://psychodietmed-git-develop-kryptonum.vercel.app/podsumowanie?status=failed')
    else
      return NextResponse.redirect('https://psychodietmed-git-develop-kryptonum.vercel.app/podsumowanie?status=error')
  }
}